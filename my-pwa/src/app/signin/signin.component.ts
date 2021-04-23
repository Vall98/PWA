import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '../services/device.service';
import { UserService } from '../services/user.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  submitting: boolean = false;
  hidePassword: boolean = true;
  error: String | undefined;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private dialogRef: MatDialogRef<SigninComponent>,
    private userService: UserService, private deviceService: DeviceService, private snackBar: MatSnackBar) {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  signin(): void {
    this.submitting = true;
    const username = this.signinForm.get('username');
    const password = this.signinForm.get('password');
    if (!username || !password) return;
    this.userService.signin(username.value, password.value).subscribe((data) =>  {
      this.userService.token = data.access_token;
      this.userService.updateLocalUserInfo();
      this.userService.saveToken(data.access_token);
      this.userService.connected = true;
      this.deviceService.registerToken();
      this.dialogRef.close();
      this.submitting = false;
    }, (err) => {
      this.error = err.error.error_description;
      if (this.error = "Invalid credentials given.") {
        this.error = "Identifiant ou mot de passe incorrect."
      } else {
        this.snackBar.open("Une erreur s'est produite", "Fermer", { duration: 2000 });
      }
      this.submitting = false;
    });
  }

  signup(): void {
    this.dialog.open(SignupComponent);
  }

}
