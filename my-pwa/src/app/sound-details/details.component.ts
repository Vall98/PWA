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

    constructor(private route: ActivatedRoute, private http: HttpClient, private userService: UserService) {
    }
    
    ngOnInit(): void {
        this.innerWidth = window.innerWidth;
        this.getSoundDetail();
      }

    getSoundDetail():void {
        this.route.params.subscribe(params => this.id = params.id);
        this.getSoundById(this.id).subscribe(detail => this.sound = detail)
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
}

export class Sound {
    id: number = 0;
    title: String = "";
    style: number = 0;
    file: String = "";
    added_on!: Date;
    album: number = 0;
    artist: number = 0;
    added_by: string = "";
  }