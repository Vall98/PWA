import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../services/sounds.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  soundId: number;
  public innerWidth: any;
  dataSource: Comment[] = [];
  displayedColumns: string[] = ['post_by', 'comments'];

  constructor(private route: ActivatedRoute) {
    this.soundId = Number(this.route.snapshot.paramMap.get('id'));
  }
  
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }
    
  displayComments(event: Comment[]) {
    this.dataSource = event;
    console.log(this.dataSource);
  }
}