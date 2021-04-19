import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistsService } from '../services/artists.service';
import { Album, SoundsService } from '../services/sounds.service';
import { Followed, UserService } from '../services/user.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  album: Album = new Album();

  constructor(private route: ActivatedRoute, private soundsService: SoundsService, public artistsService: ArtistsService, public userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = Number(params['id']);
      this.soundsService.getAlbumById(id).subscribe((data) => {
        this.album = data;
        if (this.album.added_by == undefined) {
          this.album.added_by = 4;
        }
      })
    });
  }
}
