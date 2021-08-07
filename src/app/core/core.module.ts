import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SliderComponent } from './slider/slider.component';
import { FeatureComponent } from './feature/feature.component';
import { TeamComponent } from './team/team.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { AuthActivate } from './guards/auth.activate';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    FeatureComponent,
    TeamComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    FeatureComponent,
    TeamComponent,
    HomeComponent,
  ],
  providers:[ AuthActivate ]
})
export class CoreModule { }
