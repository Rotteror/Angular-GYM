import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProgram } from 'src/app/shared/interfaces/program';
import { ProgramService } from '../program.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  currentProgram: IProgram | undefined;
  comments: [] = [];

  userId = localStorage.getItem('_id');
  isFollower!: boolean


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
    setTimeout(() => {
      (this.isFollower as any) = this.currentProgram?.followers.includes(this.userId + '')
    }, 100);
  }

  fetchCurrentProgram(): void {
    this.currentProgram = undefined;
    const id = this.activatedRoute.snapshot.params.id;
    this.programService.loadCurrentProgram(id).subscribe(program =>
      this.currentProgram = program,
    );
  };

  deleteHandler(): void {
    const id = this.currentProgram?._id
    if (!id) {
      throw new Error('Something went wrong , missing arguments');
    }
    const confirmed = confirm('Are you sure you want delete this article!')
    if (confirmed) {
      this.programService.deleteProgram(id).subscribe({
        next: () => {
          this.router.navigate(['/'])
        },
        error: (err) => {
          console.log(err.error.message)
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
        //this.fetchCurrentProgram();
      },
    })

  };

  unfollowHandler(): void {
    const postId = this.currentProgram?._id;
    const userId = localStorage.getItem('_id');
    this.programService.unfollowProgram({ userId, postId }).subscribe({
      next: (program) => {
        this.isFollower = !this.isFollower
        // this.fetchCurrentProgram();
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
      next: (res) => {
        this.toastr.success('Succesfully added comment !', 'Done');
      },
      error: () => {

      }
    })
  }

}
