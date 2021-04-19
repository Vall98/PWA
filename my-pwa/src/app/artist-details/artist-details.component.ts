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

  constructor(private route: ActivatedRoute, private artistsService: ArtistsService, public userService: UserService) {
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = Number(params['id']);
      this.artist = this.artistsService.getArtistById(id) || this.artist;
    });
  }

  isArtistFollowed(): boolean {
    if (!this.userService.connected || !this.userService.user?.user_followed) return false;
    let user: Followed | undefined = this.userService.user?.user_followed.find(obj => {
      return obj.target === this.artist.id;
    })
    console.log(user);
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
