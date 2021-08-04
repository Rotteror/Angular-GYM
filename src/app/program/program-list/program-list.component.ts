import { Component, OnInit } from '@angular/core';
import { faDumbbell, faHeart } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent implements OnInit {

  icons = {
    faDumbbell,
    faHeart
  }

  constructor() { }

  ngOnInit(): void {
  }

}
