import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Artist, ArtistsService } from '../services/artists.service';
import { Comment, Sound, SoundsService } from '../services/sounds.service';

@Component({
  selector: 'app-soundcard',
  templateUrl: './soundcard.component.html',
  styleUrls: ['./soundcard.component.css']
})
export class SoundcardComponent implements OnInit, OnChanges {
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
    }, (err) => {
      this.sound.title = "404";
      this.albumPicture = "https://blog.natro.com/wp-content/uploads/2019/12/404-hata-sayfasi.jpg";
    });
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  stopPropagation(event: any): void {
    event.stopPropagation();
  }
}
