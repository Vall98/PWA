import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
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
    setTimeout(() => {
      this.submitting = false;
    }, 3000);
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