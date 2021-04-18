import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-sounds',
  templateUrl: './my-sounds.component.html',
  styleUrls: ['./my-sounds.component.css']
})
export class MySoundsComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
