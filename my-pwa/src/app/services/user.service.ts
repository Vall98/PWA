import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  connected: boolean = false;
  user: User = new User();
  token: String = "";

  constructor(private http: HttpClient) { }

  signup(username: String, password: String, email: String): Observable<any> {
    const url = environment.api + "users/"
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

  updateLocalUserInfo(): void {
    const url = environment.api + "profile/"
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + this.token
      })
    };
    this.http.get(url, httpOptions).subscribe((data: any) => {
      this.user = data;
      this.connected = true;
    }, (err) => {
      console.log("Could not retrieve user info.");
    });
  }

}

class User {
  id: number = 0;
  username: String = "";
  email: String = "";
  profile_picture: String = "";
}