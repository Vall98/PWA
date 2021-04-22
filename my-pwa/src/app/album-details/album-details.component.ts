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
  found: boolean = true;

  constructor(private route: ActivatedRoute, private soundsService: SoundsService, public artistsService: ArtistsService, public userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      this.soundsService.getAlbumById(id).subscribe((data) => {
        this.album = data;
      }, (err) => {
        this.album.picture = "https://blog.natro.com/wp-content/uploads/2019/12/404-hata-sayfasi.jpg";
        this.album.title = "404";
        this.found = false;
      });
    });
  }
}
