import { Component, OnInit } from '@angular/core';
import { faHeadset,  faEnvelope, faPhoneAlt} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  icons = {
    faHeadset,
    faEnvelope,
    faPhoneAlt
  }

  ngOnInit(): void {
  }

}
