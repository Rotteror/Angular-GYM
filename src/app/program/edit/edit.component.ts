import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProgram } from 'src/app/shared/interfaces/program';
import { ProgramService } from '../program.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  currentProgram: IProgram | undefined;
  editPost: FormGroup

  constructor(private programService: ProgramService, private router: Router, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private toastr: ToastrService) {
    this.fetchCurrentProgram();
    this.editPost = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(30)]],
      length: ['', [Validators.required]],
      bodyFocus: ['', [Validators.required]],
      averageDuration: ['', [Validators.required]],
      daysPerWeek: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
    })
  }

  ngOnInit(): void {

  }

  fetchCurrentProgram(): void {
    this.currentProgram = undefined;
    const id = this.activatedRoute.snapshot.params.id;
    this.programService.loadCurrentProgram(id).subscribe(program => {
      this.currentProgram = program;
      this.editPost.patchValue({
        title: this.currentProgram.title,
        length: this.currentProgram.length,
        bodyFocus: this.currentProgram.bodyFocus,
        averageDuration: this.currentProgram.averageDuration,
        daysPerWeek: this.currentProgram.daysPerWeek,
        description: this.currentProgram.description
      })
    });
  };

  cancelEditHandler(): void {
    this.router.navigate(['/programs', this.currentProgram?._id])
  }

  editProgramHandler(): void {
    const data = this.editPost.value;
    const id = this.currentProgram?._id
    if (data.invalid) {
      return
    };
    const confirmed = confirm('Are you sure you want to edit this Article!');
    if(confirmed){
      this.programService.editProgram(id, data).subscribe({
        next: () => {
          this.router.navigate(['programs', id])
          this.toastr.success('Succesfully Edit Post', 'Done')
        },
        error: (err) => {
          console.log(err.error.message)
        }
      })
    }

  }

}
