import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProgramComponent } from './new-program/new-program.component';
import { ProgramService } from './program.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramListComponent } from './program-list/program-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailsComponent } from './details/details.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    NewProgramComponent,
    ProgramListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports:[
    NewProgramComponent,
    ProgramListComponent,
    DetailsComponent

  ],
  providers:[
    ProgramService
  ]
})
export class ProgramModule { }
