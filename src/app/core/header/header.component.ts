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
        console.log('succesfull logout')
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('_id');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('accessToken');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err)
        console.error(err);
      }
    })
  }

}
