import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Album, Sound, SoundsService } from './sounds.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  connected: boolean = false;
  user: User = new User();
  token: String = "";

  constructor(private http: HttpClient, private soundsService: SoundsService) {
  }

  connectFromToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      const token = this.retrieveToken();
      if (token == null) {
        reject("Token is null");
        return;
      }
      this.token = token;
      const url = environment.api + "profile/"
      const httpOptions = this.getUserAuthHeader();
      this.http.get(url, httpOptions).subscribe((data: any) => {
        this.user = data;
        this.connected = true;
        this.cacheMySounds();
        if (!this.user.profile_picture || this.user.profile_picture == "") {
          this.user.profile_picture = "https://ts3.wondercube.fr/images/default_profile.png";
        }
        resolve(data);
      }, (err) => {
        this.token = "";
        reject(err);
      });
    });
  }

  cacheMySounds() {
    this.soundsService.token = this.token;
    console.log("CACHE SOUND");
    for (let sound of this.user.sounds) {
      console.log(sound);
      this.soundsService.getSoundById(sound.id).subscribe();
      fetch(sound.file + '', { mode: 'no-cors' }).then();
    }
    for (let album of this.user.albums) {
      console.log(album);
      this.soundsService.getAlbumById(album.id).subscribe();
      fetch(album.picture, { mode: 'no-cors' }).then();
    }
  }

  saveToken(token: string): void {
    localStorage.setItem('id_token', token);
  }
  
  private retrieveToken(): string | null {
    return localStorage.getItem('id_token');
  }

  getUserAuthHeaderFileTransfer() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
  }

  getUserAuthHeader(): { headers: HttpHeaders; } {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + this.token
      })
    };
  }

  signup(username: String, password: String, email: String): Observable<any> {
    const url = environment.api + "users/";
    return this.http.post(url, {username: username, password: password, email: email})
  }

  signin(username: String, password: String): Observable<any> {
    const url = environment.api + "o/token/";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: environment.api_token
      })
    };
    return this.http.post(url, "grant_type=password&username=" + username + "&password=" + password, httpOptions);
  }

  updateUser(username: String, password: String, email: String): Observable<any> {
    const url = environment.api + "users/" + this.user.id + "/";
    const httpOptions = this.getUserAuthHeader();
    let body: String = "";
    if (!!username && username != "") body += "username=" + username + "&";
    if (!!password && password != "") body += "password=" + password + "&";
    if (!!email && email != "") body += "email=" + email + "&";
    return this.http.patch(url, body, httpOptions);
  }

  updatePicture(file: File): Observable<any> {
    const url = environment.api + "upload-profile-picture/";
    const httpOptions = this.getUserAuthHeaderFileTransfer();
    let formData = new FormData();
    formData.append('picture', file, file.name);
    return this.http.patch(url, formData, httpOptions);
  }

  updateLocalUserInfo(): void {
    const url = environment.api + "profile/"
    const httpOptions = this.getUserAuthHeader();
    this.http.get(url, httpOptions).subscribe((data: any) => {
      this.user = data;
      this.connected = true;
      this.cacheMySounds();
      if (!this.user.profile_picture || this.user.profile_picture == "") {
        this.user.profile_picture = "https://ts3.wondercube.fr/images/default_profile.png";
      }
    }, (err) => {
      console.log("Could not retrieve user info.");
    });
  }

  follow(id: number): Observable<any> {
    const url = environment.api + "users/" + id + "/follow/";
    const httpOptions = this.getUserAuthHeader();
    return this.http.post(url, {}, httpOptions);
  }
  
  unfollow(id: number): Observable<any> {
    const url = environment.api + "users/" + id + "/unfollow/";
    const httpOptions = this.getUserAuthHeader();
    return this.http.delete(url, httpOptions);
  }
}

class User {
  id: number = 0;
  username: String = "";
  email: String = "";
  profile_picture: string | ArrayBuffer = "";
  albums: Album[] = [];
  sounds: Sound[] = [];
  user_followed: Followed[] = [];
}

export class Followed {
  target: number = 0;
}