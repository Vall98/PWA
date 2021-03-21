import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  submitting: boolean = false;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  signin(): void {
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
    }, 3000);
  }

  signup(): void {
    this.dialog.open(SignupComponent);
  }

}
