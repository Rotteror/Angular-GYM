import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IProgram } from 'src/app/shared/interfaces/program';
import { ProgramService } from '../program.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  icons = {
    faTrashAlt
  }

  currentProgram: IProgram | undefined;
  userId = localStorage.getItem('_id');
  isFollower!: boolean

  refreshProgram$ = new BehaviorSubject<boolean>(true);

  get isOwner(): boolean {
    return this.userId === this.currentProgram?.owner._id
  }

  constructor(
    private programService: ProgramService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {

  }


  ngOnInit(): void {
    this.fetchCurrentProgram();

    //After fetch all data find first Follower - value
    setTimeout(() => {
      (this.isFollower as any) = this.currentProgram?.followers.includes(this.userId + '')
    }, 100);

    //navigate to 404 if Program dont exist!
    setTimeout(() => {
      if (this.currentProgram === undefined) {
        this.router.navigate(['/404']);
      }
    }, 300)
  }

  fetchCurrentProgram(): void {
    this.currentProgram = undefined;
    const id = this.activatedRoute.snapshot.params.id;
    // this.programService.loadCurrentProgram(id).subscribe(program =>
    //   this.currentProgram = program,
    // );
    this.refreshProgram$.pipe(switchMap(_ => this.programService.loadCurrentProgram(id)))
      .subscribe(program => this.currentProgram = program)
  };

  deleteHandler(): void {
    const id = this.currentProgram?._id
    if (!id) {
      throw new Error('Something went wrong , missing program');
    }
    const confirmed = confirm('Are you sure you want delete this article!')
    if (confirmed) {
      this.programService.deleteProgram(id).subscribe({
        next: () => {
          this.router.navigate(['/'])
          this.toastr.success('You succesfully delete post', 'Done')
        }
      });
    }
  };

  followHandler(): void {
    const postId = this.currentProgram?._id;
    const userId = localStorage.getItem('_id');
    this.programService.followProgram({ userId, postId }).subscribe({
      next: (program) => {
        this.isFollower = !this.isFollower
      },
    })

  };

  unfollowHandler(): void {
    const postId = this.currentProgram?._id;
    const userId = localStorage.getItem('_id');
    this.programService.unfollowProgram({ userId, postId }).subscribe({
      next: (program) => {
        this.isFollower = !this.isFollower
        this.refreshProgram$.next(true)
      },
    })

  }

  // get isFollower(): boolean {
  //   if (this.currentProgram) {
  //     return this.currentProgram.followers.includes(this.userId + '');
  //   }
  //   return false;
  // }

  addComment(form: NgForm): void {
    if (form.invalid) { return };
    const { content } = form.value;
    if (!this.currentProgram) { return }
    this.programService.addCommentToProgram(this.currentProgram._id, { content }).subscribe({
      next: () => {
        this.refreshProgram$.next(true)
        this.toastr.success('Succesfully added comment !', 'Done');
        form.reset();
      },
    })
  }

  deleteComment(id: string): void {
    console.log(id)
    const confirmed = confirm('Are you sure you want delete this comment!')
    if (confirmed) {
      this.programService.deleteCommentFromProgram(id, this.currentProgram?._id).subscribe({
        next: () => {
          this.refreshProgram$.next(true)
          this.toastr.success('You succesfully delete comment', 'Done')
        }
      });
    }

  }

  ngOnDestroy(): void {
    this.refreshProgram$.next(true);
    this.refreshProgram$.complete();
  }

}
