import { Component, Input, OnInit } from '@angular/core';
import { Sound } from '../services/sounds.service';

@Component({
  selector: 'app-soundcard',
  templateUrl: './soundcard.component.html',
  styleUrls: ['./soundcard.component.css']
})
export class SoundcardComponent implements OnInit {
@Input() sound: Sound | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
