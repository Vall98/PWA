import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  artists: Artist[] = [];

  constructor(private http: HttpClient, private userService : UserService) { }

  getHttpOptions() {
    alert ("Retirer l'autentification pour les get");
     return {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + this.userService.token
      })
    };
  }

  getArtistById(id: number): Artist | undefined {
    return this.artists.find(a => a.id === id);
  }

  getAllArtists(): void {
    const url = environment.api + "users/"
    this.http.get(url + "?ordering=username", this.getHttpOptions()).subscribe((data: any) => {
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
  profile_picture: String = "";
  sounds: any[] = [];
  playlists: any[] = [];
}