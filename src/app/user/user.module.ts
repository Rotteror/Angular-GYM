import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { appInterceptorProvider } from '../app-interceptor';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    UserRoutingModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  providers: [
    UserService,
  ]

})
export class UserModule { }
