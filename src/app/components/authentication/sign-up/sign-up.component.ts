import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../ressources/authentication.service';
import {Router} from '@angular/router';
import {UserService} from '../../../ressources/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userForm: FormGroup;
  nicknameCtrl: FormControl;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  errorMessage: string;

  constructor(formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router)
  {
    this.nicknameCtrl = formBuilder.control('', Validators.required);
    this.emailCtrl = formBuilder.control('', Validators.required);
    this.passwordCtrl = formBuilder.control('', Validators.required);

    this.userForm = formBuilder.group({
      nickname: this.nicknameCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl,
    });
  }

  ngOnInit() {
    if(this.authenticationService.isLogged()) {
      this.router.navigate(['home']).then();
    }
  }

  onSubmit() {
    this.authenticationService.register(this.userForm.value).subscribe(() => {
        const loginForm = {
          "email": this.userForm.value["email"],
          "password": this.userForm.value["password"]
        };
        this.authenticationService.login(loginForm).subscribe(user => {
          this.userService.currentUser = user;
          localStorage.setItem('token', user.token);
          localStorage.setItem('user_id', user._id);
          localStorage.setItem('permissions', user.permissionLevel);
          this.router.navigate(['home']).then();
        });
      },
      (error) => {
        switch (error.status) {
          case 409:
              this.errorMessage = "Email or nickname already exist!";
              break;
          case 400:
            this.errorMessage = "Fields can't be empty!";
        }
      });
  }
}
