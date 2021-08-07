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
}
