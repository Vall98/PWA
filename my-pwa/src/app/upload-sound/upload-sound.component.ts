import { Component, EventEmitter, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { SoundsService, Style, Album } from '../services/sounds.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-upload-sound',
  templateUrl: './upload-sound.component.html',
  styleUrls: ['./upload-sound.component.css']
})
export class UploadSoundComponent implements OnInit {

  styles: Style[] = [];
  soundForm: FormGroup;
  file!: File;

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  constructor(private soundsService: SoundsService, private formBuilder: FormBuilder, public userService: UserService) {
    this.soundForm = this.formBuilder.group({
      Titre: [''],
      style: [''],
      album: [''],
    });
  }

  ngOnInit(): void {
    this.getStylesList();
    this.initForm();
  }

  initForm() {
    
  }

  onFileSelected(event: any): void {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.soundForm.get('filename')?.setValue(this.file.name);
    }
  }

  getStylesList():void {
    this.soundsService.getStyles()
      .subscribe(data => this.styles = data.results);
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  sendSound(): void {
    const titre = this.soundForm.get('titre')?.value;
    const style = this.soundForm.get('style')?.value;
    const album = this.soundForm.get('album')?.value;
    this.soundsService.postSound(titre, style, album, this.file);
  }
}