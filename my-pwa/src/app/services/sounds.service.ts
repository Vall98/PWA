import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {

  token: String = "";

  constructor(private http: HttpClient) { }

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

  getSoundById(id: number): Observable<any>{
      const url = environment.api + 'sounds/' + id;
      return this.http.get<Sound[]>(url);
  }

  getStyleByID(id: number): Observable<any>{
    const url = environment.api + 'styles/' + id;
    return this.http.get(url);
  }

  getAlbumById(id: number): Observable<any> {
    const url = environment.api + 'albums/' + id;
    return this.http.get(url);
  }

  getStyles(): Observable<any>{
    const url = environment.api + 'styles/';
    return this.http.get(url);
  }

  postSound(titleInput: string, styleInput: number, albumInput: number, fileInput: File): Observable<any> {
    const url = environment.api + 'sounds/';
    let formData: FormData = new FormData();
    formData.append('title', titleInput);
    formData.append('style', '' + styleInput);
    formData.append('file', fileInput, fileInput.name);
    formData.append('album', '' + albumInput);
    return this.http.post(url, formData, this.getUserAuthHeaderFileTransfer());
  }

  postAlbum(titleInput: string, fileInput: File): Observable<any> {
    const url = environment.api + 'albums/';
    let formData: FormData = new FormData();
    formData.append('title', titleInput);
    formData.append('picture', fileInput, fileInput.name);
    return this.http.post(url, formData, this.getUserAuthHeaderFileTransfer());
  }

  postComment(id: number, comment: string): Observable<any> {
    const url = environment.api + 'sounds/' + id + "/comment/ ";
    let body = "message=" + comment;
    return this.http.post(url, body, this.getUserAuthHeader());
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
  album: Album = new Album();
  artist: number = 0;
  added_by: number = 0;
}

export class Comment {
  id: number = 0;
  post_by: string = "";
  added_on: string = "";
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
  added_by: number = 0;
  sounds: Sound[] = [];
}