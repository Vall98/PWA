import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist, ArtistsService } from '../services/artists.service';
import { Album, Sound, SoundsService } from '../services/sounds.service';

@Component({
  selector: 'app-albumcard',
  templateUrl: './albumcard.component.html',
  styleUrls: ['./albumcard.component.css']
})
export class AlbumcardComponent implements OnInit {
  @Input() albumId: number | undefined;
  @Output() sounds = new EventEmitter<Sound[]>();

  album: Album = new Album();
  artist: Artist = new Artist();

  constructor(private soundsService: SoundsService, private artistsService: ArtistsService) {
  }

  ngOnInit(): void {
    if (this.albumId == undefined) return;
    this.soundsService.getAlbumById(this.albumId).subscribe((album) =>  {
      this.album = album;
      if (!this.album.picture || this.album.picture == "") this.album.picture = "https://static.thenounproject.com/png/55431-200.png";
      const sounds: Sound[] = album.sounds;
      this.sounds.emit(sounds);
      //this.artist = this.artistsService.getArtistById(this.album.added_by) || this.artist;
    });
  }

  stopPropagation(event: any): void {
    event.stopPropagation();
  }
}
