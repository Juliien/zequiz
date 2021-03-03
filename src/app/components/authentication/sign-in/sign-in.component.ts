import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../ressources/authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UserService} from '../../../ressources/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  loginForm: FormGroup;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;

  constructor(public  formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router)
  {
    this.emailCtrl = formBuilder.control('', Validators.required);
    this.passwordCtrl = formBuilder.control('', Validators.required);

    this.loginForm = formBuilder.group({
      email: this.emailCtrl,
      password: this.passwordCtrl,
    });
  }

  onSubmit() {
    this.authenticationService.login(this.loginForm.value).subscribe(user => {
      this.userService.currentUser = user;
      localStorage.setItem('token', user.token);
      localStorage.setItem('user_id', user._id);
      localStorage.setItem('permissions', user.permissionLevel);
      this.router.navigate(['home']).then();
    })
  }
}
