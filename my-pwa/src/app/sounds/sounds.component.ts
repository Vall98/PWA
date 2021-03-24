import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.css']
})
export class SoundsComponent implements OnInit {
  
  dataSource: Sound[] = [];
  displayedColumns: string[] = ['id', 'title', 'file'];

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.token != "")
      this.getSoundsList();
  }

  /*getHeroes(): void {
    this.getSounds()
      .subscribe(soundss => this.sounds = sounds);
  }*/

  getSoundsList():void {
    this.getSounds()
      .subscribe(sounds => this.dataSource = sounds.results);
    console.log(this.dataSource);
  }

  getSounds():Observable<any>{
    const url = environment.api + 'sounds/';
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + this.userService.token
        })
      };

    return this.http.get<Sound[]>(url, httpOptions);
  }

}

export interface Sound {
  id: number;
  title: String;
  style: number;
  file: String;
  added_on: Date;
  album: number;
  artist: number;
  added_by: string;
}