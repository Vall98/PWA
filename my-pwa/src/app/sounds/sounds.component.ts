import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Sound } from '../services/sounds.service';

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.css']
})
export class SoundsComponent implements OnInit {
  
  dataSource: Sound[] = [];
  displayedColumns: string[] = ['id', 'title', 'sound'];

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.getSoundsList();
  }

  getSoundsList():void {
    this.getSounds()
      .subscribe(sounds => this.dataSource = sounds.results);
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