import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProgramComponent } from './new-program/new-program.component';
import { ProgramService } from './program.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramListComponent } from './program-list/program-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    NewProgramComponent,
    ProgramListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    NewProgramComponent,
    ProgramListComponent
  ],
  providers:[
    ProgramService
  ]
})
export class ProgramModule { }
