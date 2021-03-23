import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitting: boolean = false;
  matcher = new MyErrorStateMatcher();
  hidePassword: boolean = true;
  hideConfirm: boolean = true;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private dialogRef: MatDialogRef<SignupComponent>, public userService: UserService) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,128}$/)],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    if (!group) return null;
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    if (!password || !confirmPassword) return null;
    return password.value === confirmPassword.value ? null : { notSame: true }     
  }

  ngOnInit() {
  }

  signup(): void {
    this.submitting = true;
    const username = this.signupForm.get('username');
    const password = this.signupForm.get('password');
    const email = this.signupForm.get('email');
    if (!username || !password || !email) return;
    this.userService.signup(username.value, password.value, email.value).subscribe(() => {
      this.userService.signin(username.value, password.value).subscribe((data) => {
        this.userService.token = data.access_token;
        this.userService.updateLocalUserInfo();
        this.dialogRef.close();
        this.submitting = false;
      });
    }, (err) => {
      alert("L'inscription n'a pas aboutie.");
      this.submitting = false;
    });
  }

  signin() : void {
    this.dialog.open(SigninComponent);
  }
}

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);
    return invalidCtrl || invalidParent;
  }
}