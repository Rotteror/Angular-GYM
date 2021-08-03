import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProgramComponent } from './new-program/new-program.component';
import { ProgramService } from './program.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NewProgramComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    NewProgramComponent
  ],
  providers:[
    ProgramService
  ]
})
export class ProgramModule { }
