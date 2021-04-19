import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist, ArtistsService } from '../services/artists.service';
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
  artist: Artist = new Artist();
  albumPicture: String = "https://static.thenounproject.com/png/55431-200.png";

  constructor(private soundsService: SoundsService, private artistsService: ArtistsService) {
  }

  ngOnInit(): void {
    if (this.soundId == undefined) return;
    this.soundsService.getSoundById(this.soundId).subscribe((detail) =>  {
      this.sound = detail;
      const comments: Comment[] = detail.comments;
      this.comments.emit(comments);
      this.albumPicture = this.sound.album?.picture || this.albumPicture;
      this.soundsService.getStyleByID(this.sound.style).subscribe(style => this.sound.style_name = style.name);
      this.artist = this.artistsService.getArtistById(this.sound.added_by) || this.artist;
    });
  }

  stopPropagation(event: any): void {
    event.stopPropagation();
  }

/*  likeSound(event: any): void {
    event.stopPropagation();
    this.soundsService.postLikeSound(this.sound.id);
  }*/
}
