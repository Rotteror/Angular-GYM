import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SliderComponent } from './slider/slider.component';
import { FeatureComponent } from './feature/feature.component';
import { TeamComponent } from './team/team.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    FeatureComponent,
    TeamComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    FeatureComponent,
    TeamComponent
  ]
})
export class CoreModule { }
