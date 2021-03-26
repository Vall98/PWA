import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getHttpOptions() {
    alert ("Retirer l'autentification pour les get");
     return {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + this.userService.token
      })
    };
  }

  getSoundById(id: number):Observable<any>{
      const url = environment.api + 'sounds/' + id;
      return this.http.get<Sound[]>(url, this.getHttpOptions());
  }

  getStyleByID(id:number):Observable<any>{
    const url = environment.api + 'styles/' + id;
    return this.http.get(url, this.getHttpOptions());
  }

  getStyles():Observable<any>{
    const url = environment.api + 'styles/';
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + this.userService.token
        })
      };
    return this.http.get(url, httpOptions);
  }

  getAlbums():Observable<any>{
    const url = environment.api + 'albums/';
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + this.userService.token
        })
      };
    return this.http.get(url, httpOptions);
  }

  PostLikeSound(id:number):void{
    const url = environment.api + 'sounds/' + id + '/like/';
    this.http.post(url, this.getHttpOptions());
  }

  PostSound(title:string, style:number, album:number, file:string ):Observable<any>{
    const url = environment.api + 'sounds/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + this.userService.token
      })
    };
    const body = { title:title,
                   style:style,
                   file:file,
                   album:album,
                   }
    return this.http.post(url, body, httpOptions);
  }
}

export class Sound {
  id: number = 0;
  title: String = "";
  style: number = 0;
  style_name: string = "";
  file: String = "";
  added_on!: Date;
  like_count: number = 0;
  album: number = 0;
  artist: number = 0;
  added_by: number = 0;
}

export class Comment {
  id: number = 0;
  sound: string = "";
  post_by: string = "";
  message: string = "";
}

export class Style {
  id: number = 0;
  name: string = "";
}

export class Album {
  id: number = 0;
  title: string = "";
  picture: string = "";
}