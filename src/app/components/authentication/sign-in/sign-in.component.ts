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
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  errorMessage: string;
  isMobile: boolean;

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

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 765;
    if(this.authenticationService.isLogged()) {
      this.router.navigate(['home']).then();
    }
  }

  onSubmit() {
    this.authenticationService.login(this.loginForm.value).subscribe(user => {
      this.userService.currentUser = user;
      localStorage.setItem('token', user.token);
      localStorage.setItem('user_id', user._id);
      localStorage.setItem('permissions', user.permissionLevel);
      this.router.navigate(['home']).then();
    }, (error) => {
      switch (error.status) {
        case 401:
          this.errorMessage = "Email or password is wrong!";
          break;
        case 400:
          this.errorMessage = "Fields can't be empty!";
      }
    });
  }
}
