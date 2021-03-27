import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist, ArtistsService } from '../services/artists.service';
import { Playlist, Sound, SoundsService } from '../services/sounds.service';

@Component({
  selector: 'app-playlistcard',
  templateUrl: './playlistcard.component.html',
  styleUrls: ['./playlistcard.component.css']
})
export class PlaylistcardComponent implements OnInit {
  @Input() playlistId: number | undefined;
  @Output() sounds = new EventEmitter<Sound[]>();
  @Output() comments = new EventEmitter<Comment[]>();

  playlist: Playlist = new Playlist();
  artist: Artist = new Artist();

  playlistPicture = "https://static.thenounproject.com/png/55431-200.png";

  constructor(private soundsService: SoundsService, private artistsService: ArtistsService) {
  }

  ngOnInit(): void {
    if (this.playlistId == undefined) return;
    this.soundsService.getAlbumById(this.playlistId).subscribe((playlist) =>  {
      this.playlist = playlist;
      //if (!this.playlist.picture || this.playlist.picture == "") this.playlistId.picture = "https://static.thenounproject.com/png/55431-200.png";
      const sounds: Sound[] = playlist.sounds;
      this.sounds.emit(sounds);
      const comments: Comment[] = playlist.comments;
      this.comments.emit(comments);
      this.artist = this.artistsService.getArtistById(this.playlist.added_by) || this.artist;
    });
  }
}
