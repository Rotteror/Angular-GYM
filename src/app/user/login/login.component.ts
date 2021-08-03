import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorLogin: string | undefined

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) 
  {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
  }

  loginHandler(): void {
    if (this.form.invalid) { return };
    const { email, password } = this.form.value;
    this.userService.login({ email, password }).subscribe({
      next: (result) => {
        console.log('succesfull login')
        sessionStorage.setItem('_id', result._id )
        sessionStorage.setItem('email', result.email )
        sessionStorage.setItem('username', result.username )
        sessionStorage.setItem('accessToken', result.accessToken )
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.log(err.error.message)
        this.errorLogin = err.error.message
      }
    })
  }

}
