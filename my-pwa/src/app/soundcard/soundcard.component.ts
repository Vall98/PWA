import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment, Sound, SoundsService } from '../services/sounds.service';

@Component({
  selector: 'app-soundcard',
  templateUrl: './soundcard.component.html',
  styleUrls: ['./soundcard.component.css']
})
export class SoundcardComponent implements OnInit {
  @Input() soundId: number | undefined;
  @Output() comments = new EventEmitter<Comment[]>();

  sound: Sound = new Sound();

  constructor(private soundsService: SoundsService) { }

  ngOnInit(): void {
    if (this.soundId == undefined) return;
    this.soundsService.getSoundById(this.soundId).subscribe((detail) =>  {
      this.sound = detail;
      const comments: Comment[] = detail.comments;
      this.comments.emit(comments);
      this.soundsService.getStyleByID(this.sound.style).subscribe(style => this.sound.style_name = style.name);
    });
  }

  LikeSound(){
    this.soundsService.PostLikeSound(this.sound.id);
  }
}
