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
        if (!a.profile_picture || a.profile_picture == "") a.profile_picture = "https://static.thenounproject.com/png/55431-200.png";
      }
    }, (err) => {
      alert(err.error);
    });
  }
}

export class Artist {
  id: number = 0;
  username: String = "";
  profile_picture: String = "https://static.thenounproject.com/png/55431-200.png";
  sounds: Sound[] = [];
  playlists: Playlist[] = [];
  albums: Album[] = [];
}