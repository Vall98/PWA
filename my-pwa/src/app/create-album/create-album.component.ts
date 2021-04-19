import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SoundsService } from '../services/sounds.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {

  albumForm: FormGroup;
  img: string | ArrayBuffer | null = "";
  imgFile: File | undefined;
  submitting: boolean = false;

  constructor(private soundsService: SoundsService, private formBuilder: FormBuilder, private userService: UserService, private dialogRef: MatDialogRef<CreateAlbumComponent>) {
    this.albumForm = this.formBuilder.group({
      title: ['']
    });
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    let self = this;
    let readerUrl = new FileReader();
    readerUrl.onload = function () {
      self.img = readerUrl.result;
    }
    readerUrl.readAsDataURL(file);
    this.imgFile = file;
  }

  postAlbum(): void {
    if (!this.imgFile) {
      alert("Choisissez une image");
      return;
    }
    const title = this.albumForm.get('title')?.value;
    if (!title || title == '') {
      return;
    }
    this.submitting = true;
    this.soundsService.postAlbum(title, this.imgFile).subscribe((data) => {
      this.userService.updateLocalUserInfo();
      this.submitting = false;
      this.dialogRef.close();
    }, (err) => {
      this.submitting = false;
    });;
  }

}
