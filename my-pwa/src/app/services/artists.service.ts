import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Album, Playlist, Sound } from './sounds.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  artists: Artist[] = [];

  constructor(private http: HttpClient) { }

  getArtistById(id: number): Artist | undefined {
    return this.artists.find(a => a.id === id);
  }

  getAllArtists(): void {
    const url = environment.api + "users/"
    this.http.get(url + "?ordering=username").subscribe((data: any) => {
      this.artists = data.results;
      for (let a of this.artists) {
        if (!a.profile_picture || a.profile_picture == "") a.profile_picture = "https://ts3.wondercube.fr/images/default_profile.png";
      }
    }, (err) => {
      alert(err.error);
    });
  }
}

export class Artist {
  id: number = 0;
  username: String = "";
  profile_picture: String = "https://ts3.wondercube.fr/images/default_profile.png";
  followers: number = 0;
  sounds: Sound[] = [];
  playlists: Playlist[] = [];
  albums: Album[] = [];
}