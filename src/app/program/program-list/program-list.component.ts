import { Component, OnInit } from '@angular/core';
import { faDumbbell, faHeart } from '@fortawesome/free-solid-svg-icons'
import { IProgram } from 'src/app/shared/interfaces/program';
import { ProgramService } from '../program.service';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent implements OnInit {

  programs: IProgram[] | undefined

  icons = {
    faDumbbell,
    faHeart
  }

  constructor(private programService: ProgramService) { 
  }
  
  ngOnInit(): void {
    this.fetchPrograms();
    
  }

  fetchPrograms(): void{
    this.programs = undefined;
    this.programService.loadPrograms().subscribe(programs => this.programs = programs)
  }

}
