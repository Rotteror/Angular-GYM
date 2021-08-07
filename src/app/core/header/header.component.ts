import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeadset, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  // get isLogged(): boolean {
  //   return localStorage.getItem('username') != undefined;
  // }


  constructor(private userService: UserService, private router: Router) { }

  icons = {
    faHeadset,
    faEnvelope,
    faPhoneAlt
  }

  ngOnInit(): void {
  }

  logoutHandler(): void {
    this.userService.logout().subscribe({
      next: () => {
        localStorage.removeItem('email');
        localStorage.removeItem('_id');
        localStorage.removeItem('username');
        localStorage.removeItem('token')

        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err.error.message);
      }
    })
  }

}
