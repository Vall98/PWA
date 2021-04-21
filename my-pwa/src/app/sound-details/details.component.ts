import { Component, OnInit, OnDestroy, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistsService } from '../services/artists.service';
import { Comment, SoundsService } from '../services/sounds.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy, AfterContentChecked {
  @ViewChild('details') content: ElementRef | undefined;

  soundId: number;
  scrollId: string | undefined;
  comments: Comment[] = [];
  newComment: String = "";
  commentForm: FormGroup;
  submitting: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
    public userService: UserService, private soundsService: SoundsService, private artistsService: ArtistsService) {
    this.soundId = Number(this.route.snapshot.paramMap.get('id'));
    this.scrollId = this.route.snapshot.fragment;
    this.commentForm = this.formBuilder.group({
      comment: ['']
    });
  }
  
  ngOnInit(): void {
    this.router.onSameUrlNavigation = 'reload';
  }
  
  ngOnDestroy(): void {
    this.router.onSameUrlNavigation = 'ignore';
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
    const nav = document.getElementById('details');
    const com = document.getElementById(element);
    if (com == null || nav == null) return;
    let yOffset = com.getBoundingClientRect().top - nav.getBoundingClientRect().top;
    if (this.content) this.content.nativeElement.scrollTop = 1000;
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