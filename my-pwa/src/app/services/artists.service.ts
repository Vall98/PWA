import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album, Sound } from './sounds.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  artists: Artist[] = [];
  getAllArtistsObservable: Observable<any>;

  constructor(private http: HttpClient) {
    const url = environment.api + "users/";
    this.getAllArtistsObservable = this.http.get(url + "?ordering=username");
  }

  getArtistById(id: number): Artist | undefined {
    return this.artists.find(a => a.id === id);
  }

  getAllArtists(): void {
    this.getAllArtistsObservable.subscribe((data: any) => {
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
  albums: Album[] = [];
}