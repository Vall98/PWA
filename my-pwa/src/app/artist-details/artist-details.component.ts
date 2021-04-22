import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist, ArtistsService } from '../services/artists.service';
import { UserService, Followed } from '../services/user.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent implements OnInit {

  artist: Artist = new Artist();
  artist404: Artist = new Artist();
  noFollow: boolean = false;

  constructor(private route: ActivatedRoute, private artistsService: ArtistsService, public userService: UserService) {
    this.artist404.username = "404";
    this.artist404.profile_picture = "https://blog.natro.com/wp-content/uploads/2019/12/404-hata-sayfasi.jpg";
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = Number(params['id']);
      this.artistsService.getAllArtistsObservable.subscribe((data) => {
        const a = this.artistsService.getArtistById(id);
        this.artist = a || this.artist404;
        if (a == undefined) this.noFollow = true;
      });
    });
  }

  isArtistFollowed(): boolean {
    if (!this.userService.connected || !this.userService.user?.user_followed) return false;
    let user: Followed | undefined = this.userService.user?.user_followed.find(obj => {
      return obj.target === this.artist.id;
    })
    return user != undefined;
  }

  follow(): void {
    this.userService.follow(this.artist.id).subscribe((data) => {
      this.artist.followers++;
      this.userService.updateLocalUserInfo();
    }, (err) => {

    });
  }

  unfollow(): void {
    this.userService.unfollow(this.artist.id).subscribe((data) => {
      this.artist.followers--;
      this.userService.updateLocalUserInfo();
    }, (err) => {

    });
  }

}
