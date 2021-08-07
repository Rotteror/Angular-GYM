import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgramService } from '../program.service';

@Component({
  selector: 'app-new-program',
  templateUrl: './new-program.component.html',
  styleUrls: ['./new-program.component.scss']
})
export class NewProgramComponent implements OnInit {


  formPost: FormGroup

  constructor(private programService: ProgramService, private fb: FormBuilder, private router: Router) {
    this.formPost = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(50)]],
      length: ['', [Validators.required]],
      bodyFocus: ['', [Validators.required]],
      averageDuration: ['', [Validators.required]],
      daysPerWeek: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
    })
  }

  ngOnInit(): void {
  }

  cancelPostHandler(): void{
    this.router.navigate(['../'])
  }

  postProgramHandler(): void {
    const data = this.formPost.value;
    data.owner = sessionStorage.getItem('_id');
    if (this.formPost.invalid) { return; }
    this.programService.postProgram(data).subscribe({
      next: (result) => {
        console.log('succesfull post new program')
        this.router.navigate(['/programs', result._id]);
      },
      error: (err) => {
        console.error(err.error.message)
      }
    })
  }

}
