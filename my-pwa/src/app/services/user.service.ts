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

  getUserAuthHeader(): { headers: HttpHeaders; } {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + this.token
      })
    };
  }

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

  updateUser(username: String, password: String, email: String): Observable<any> {
    const url = environment.api + "users/" + this.user.id + "/";
    const httpOptions = this.getUserAuthHeader();
    let body: String = "";
    if (!!username && username != "") body += "username=" + username + "&";
    if (!!password && password != "") body += "password=" + password + "&";
    if (!!email && email != "") body += "email=" + email + "&";
    return this.http.patch(url, body, httpOptions);
  }

  updateLocalUserInfo(): void {
    const url = environment.api + "profile/"
    const httpOptions = this.getUserAuthHeader();
    this.http.get(url, httpOptions).subscribe((data: any) => {
      this.user = data;
      this.connected = true;
      if (!this.user.profile_picture || this.user.profile_picture == "") {
        this.user.profile_picture = "https://ts3.wondercube.fr/images/default_profile.png";
      }
    }, (err) => {
      console.log("Could not retrieve user info.");
    });
  }

}

class User {
  id: number = 0;
  username: String = "";
  email: String = "";
  profile_picture: string | ArrayBuffer = "";
}