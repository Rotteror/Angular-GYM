import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorRegister: string | undefined

  form: FormGroup
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  ngOnInit(): void {
  }

  registerHandler(): void {
    const data = this.form.value;
    if (this.form.invalid) { return; }
    this.userService.register(this.form.value).subscribe({
      next: (result) => {
        sessionStorage.setItem('_id', result._id )
        sessionStorage.setItem('email', result.email )
        sessionStorage.setItem('username', result.username )
        sessionStorage.setItem('accessToken', result.accessToken )
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err.error.message)
        this.errorRegister = err.error.message; 
      }
    })
  }

}
