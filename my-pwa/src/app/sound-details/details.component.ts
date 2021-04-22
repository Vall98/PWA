import { Component, OnInit, OnDestroy, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistsService } from '../services/artists.service';
import { ConnectionService } from '../services/connection.service';
import { Comment, SoundsService } from '../services/sounds.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, AfterContentChecked {

  soundId: number;
  scrollId: string | undefined;
  comments: Comment[] = [];
  newComment: String = "";
  commentForm: FormGroup;
  submitting: boolean = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
    public userService: UserService, private soundsService: SoundsService, private artistsService: ArtistsService, public connectionService: ConnectionService) {
    this.soundId = Number(this.route.snapshot.paramMap.get('id'));
    this.commentForm = this.formBuilder.group({
      comment: ['']
    });
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.commentForm.setValue({comment: ""});
      this.soundId = Number(params['id']);
      this.scrollId = this.route.snapshot.fragment;
    });
  }

  ngAfterContentChecked() {
    if (this.scrollId && document.getElementById(this.scrollId)) {
      this.scrollTo(this.scrollId);
      this.scrollId = undefined;
    }
  }

  displayComments(event: Comment[]) {
    this.comments = event;
  }

  scrollTo(element: string): void {
    const com = document.getElementById(element);
    com?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  leaveComment(): void {
    const comment = this.commentForm.get('comment')?.value;
    if (!comment) return;
    this.submitting = true;
    this.soundsService.postComment(this.soundId, comment).subscribe((data: Comment) => {
      this.submitting = false;
      this.comments.push(data);
      this.commentForm.setValue({comment: ""});
    }, (err) => {
      this.submitting = false;
    });
  }

  getArtistName(id: string): string {
    return this.artistsService.getArtistById(Number(id))?.username + '';
  }

  getArtistPicture(id: string): string {
    return this.artistsService.getArtistById(Number(id))?.profile_picture + '';
  }

  stopPropagation(event: any): void {
    event.stopPropagation();
  }
}