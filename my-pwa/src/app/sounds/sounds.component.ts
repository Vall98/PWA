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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const url = environment.api + 'sounds/';
    this.http.get(url).subscribe((sounds: any) => {
      this.dataSource = sounds.results;
    });
  }
}