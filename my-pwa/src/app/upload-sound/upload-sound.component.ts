import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateAlbumComponent } from '../create-album/create-album.component';
import { ConnectionService } from '../services/connection.service';
import { Album, SoundsService, Style } from '../services/sounds.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-upload-sound',
  templateUrl: './upload-sound.component.html',
  styleUrls: ['./upload-sound.component.css']
})
export class UploadSoundComponent implements OnInit {

  styles: Style[] = [];
  soundFormTitle: FormGroup;
  soundFormStyle: FormGroup;
  soundFormAlbum: FormGroup;
  soundFormFile: FormGroup;
  file: File | undefined;
  submitting: boolean = false;

  constructor(private soundsService: SoundsService, private formBuilder: FormBuilder, public userService: UserService,
    public dialog: MatDialog, private router: Router, public connectionService: ConnectionService) {
    this.soundFormTitle = this.formBuilder.group({
      title: ['']
    });
    this.soundFormStyle = this.formBuilder.group({
      style: ['']
    });
    this.soundFormAlbum = this.formBuilder.group({
      album: ['']
    });
    this.soundFormFile = this.formBuilder.group({
      file: ['']
    });
  }

  ngOnInit(): void {
    this.soundsService.getStyles().subscribe(data => this.styles = data.results);
  }

  createAlbum() {
    this.dialog.open(CreateAlbumComponent);
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  postSound(): void {
    if (!this.file) return;
    this.submitting = true;
    const title = this.soundFormTitle.get('title')?.value;
    const style = this.soundFormStyle.get('style')?.value;
    const album = this.soundFormAlbum.get('album')?.value;
    this.soundsService.postSound(title, style, album, this.file).subscribe((data) => {
      this.userService.updateLocalUserInfo();
      this.submitting = false;
      this.router.navigateByUrl("/");
    }, (err) => {
      this.submitting = false;
    });
  }
}