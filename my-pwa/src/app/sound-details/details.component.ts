import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment, SoundsService } from '../services/sounds.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  soundId: number;
  comments: Comment[] = [];
  newComment: String = "";
  commentForm: FormGroup;
  submitting: boolean = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, public userService: UserService, private soundsService: SoundsService) {
    this.soundId = Number(this.route.snapshot.paramMap.get('id'));
    this.commentForm = this.formBuilder.group({
      comment: ['']
    });
  }
  
  ngOnInit(): void {
  }
    
  displayComments(event: Comment[]) {
    this.comments = event;
    this.comments = [
      {id: 0, post_by: "Vall", added_on: "2020-09-01 00:00:00", message: "Ceci est un example"},
      {id: 1, post_by: "Vall", added_on: "2020-09-01 00:00:00", message: "Ceci est un example"},
      {id: 2, post_by: "Vall", added_on: "2020-09-01 00:00:00", message: "Ceci est un example"},
    ]
  }

  leaveComment(): void {
    const comment = this.commentForm.get('comment')?.value;
    if (!comment) return;
    this.submitting = true;
    this.soundsService.postComment(this.soundId, comment).subscribe((data) => {
      this.submitting = false;
      this.commentForm.setValue({comment: ""});
    }, (err) => {
      this.submitting = false;
    });
  }
}