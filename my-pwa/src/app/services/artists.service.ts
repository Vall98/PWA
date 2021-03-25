import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getAllArtists(): void {
    const url = environment.api + "artists/"
    this.http.get(url + "?ordering=name", this.getHttpOptions()).subscribe((data: any) => {
      this.artists = data.results;
    }, (err) => {
      alert(err.error);
    });
  }

  getArtist(id: number): Observable<any> {
    const url = environment.api + "artists/" + id;
    return this.http.get(url, this.getHttpOptions());
  }

}

export class Artist {
  id: number = 0;
  name: String = "";
  sounds: [] = [];
}