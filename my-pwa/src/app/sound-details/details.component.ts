import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { SoundsComponent } from '../sounds/sounds.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    id: number = 0;
    sound = new Sound;
    public innerWidth: any;
    dataSource: Comment[] = [];
    displayedColumns: string[] = ['post_by', 'comments'];

    constructor(private route: ActivatedRoute, private http: HttpClient, private userService: UserService) {
    }
    
    ngOnInit(): void {
        this.innerWidth = window.innerWidth;
        this.getSoundDetail();
      }

    getSoundDetail():void {
        this.route.params.subscribe(params => this.id = params.id);
        this.getSoundById(this.id).subscribe((detail) =>  {
          this.sound = detail;
          this.dataSource = detail.comments;
          this.getStyleByID(this.sound.style).subscribe(style => this.sound.style_name = style.name);
        });
    }

    getSoundById(id: number):Observable<any>{
        const url = environment.api + 'sounds/' + id;
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/x-www-form-urlencoded',
              Authorization: 'Bearer ' + this.userService.token
            })
          };
        return this.http.get<Sound[]>(url, httpOptions);
    }

    getStyleByID(id:number):Observable<any>{
      const url = environment.api + 'styles/' + id;
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/x-www-form-urlencoded',
              Authorization: 'Bearer ' + this.userService.token
            })
          };
        return this.http.get(url, httpOptions);
    }
}

export class Comment {
  id: number = 0;
  sound: string = "";
  post_by: string = "";
  message: string = "";
}

export class Sound {
    id: number = 0;
    title: String = "";
    style: number = 0;
    style_name: string = "";
    file: String = "";
    added_on!: Date;
    album: number = 0;
    artist: number = 0;
    added_by: string = "";
  }