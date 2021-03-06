import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionService } from '../services/connection.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  img: string | ArrayBuffer | null = this.userService.user.profile_picture;
  imgFile: File | undefined;
  sendingImage: boolean = false;
  submitting: boolean = false;
  matcher = new MyErrorStateMatcher();
  hidePassword: boolean = true;
  hideConfirm: boolean = true;
  formErr: any = {};

  constructor(private formBuilder: FormBuilder, public userService : UserService, public connectionService: ConnectionService, private snackBar: MatSnackBar) {
    this.profileForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,128}$/)],
    confirmPassword: ['']
    }, { validator: this.checkPasswords });
    this.initForm();
  }

  initForm() {
    this.profileForm.get('username')?.setValue(this.userService.user.username);
    this.profileForm.get('email')?.setValue(this.userService.user.email);
  }

  checkPasswords(group: FormGroup) {
    if (!group) return null;
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    if (!password || !confirmPassword) return null;
    return password.value === confirmPassword.value ? null : { notSame: true }     
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    let self = this;
    let readerUrl = new FileReader();
    readerUrl.onload = function () {
      self.img = readerUrl.result;
    }
    readerUrl.readAsDataURL(file);
    this.imgFile = file;
  }

  updateProfile(): void {
    const username = this.profileForm.get('username')?.value;
    const password = this.profileForm.get('password')?.value;
    const email = this.profileForm.get('email')?.value;
    if (!username || !email) return;
    this.submitting = true;
    this.userService.updateUser(username, password, email).subscribe((data) => {
      this.userService.updateLocalUserInfo();
      this.submitting = false;
      //vos infos ont ete mise a jour
    }, (err) => {
      this.formErr = err.error;
      for (let key in this.formErr) {
        this.profileForm.controls[key]?.setErrors({'custom': err.error[key]});
      }
      this.submitting = false;
    });
  }

  sendImage(): void {
    if (!this.imgFile) return;
    this.sendingImage = true;
    this.userService.updatePicture(this.imgFile).subscribe((data) => {
      this.sendingImage = false;
      this.img = data.picture;
      this.userService.user.profile_picture = data.picture;
    }, (err) => {
      this.snackBar.open("Une erreur s'est produite", "Fermer", { duration: 2000 });
      this.sendingImage = false;
    });
  }

}

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);
    return invalidCtrl || invalidParent;
  }
}