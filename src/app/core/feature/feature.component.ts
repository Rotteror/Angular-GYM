import { Component, OnInit } from '@angular/core';
import { faHeadset,  faFileSignature, faDollarSign} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {

  icons = {
    faHeadset,
    faFileSignature,
    faDollarSign
  }

  constructor() { }

  ngOnInit(): void {
  }

}
