import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

}
