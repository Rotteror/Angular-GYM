import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProgram } from 'src/app/shared/interfaces/program';
import { ProgramService } from '../program.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  currentProgram: IProgram | undefined;

  get isOwner(): boolean{
    return localStorage.getItem('_id') === this.currentProgram?.owner._id
  }
  

  constructor(
    private programService: ProgramService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.fetchCurrentProgram();
  }

  ngOnInit(): void {

  }

  fetchCurrentProgram(): void {
    this.currentProgram = undefined;
    const id = this.activatedRoute.snapshot.params.id;
    this.programService.loadCurrentProgram(id).subscribe(program => this.currentProgram = program);
  }

  deleteHandler(): void {
    const id = this.currentProgram?._id
    if (!id) {
      throw new Error('Something went wrong , missing arguments');
    }
    console.log('in handler')
    this.programService.deleteProgram(id).subscribe({
      next: () => {
        console.log('succesfully delete record')
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.log(err.error.message)
      }
    });
  }

  followHandler(): void {
    const postId = this.currentProgram?._id;
    const userId = localStorage.getItem('_id');
    this.programService.followProgram({userId, postId }).subscribe({
      next: () => {
        console.log('succesfully follow program')
      },
      error: (err) => {
        console.log(err.error.message);
      }
    })

  }
}
