import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { ProgramModule } from './program/program.module';
import { appInterceptorProvider } from './app-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    CoreModule,
    ProgramModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 1000 * 3,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
