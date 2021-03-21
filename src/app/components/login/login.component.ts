import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../ressources/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  errorMessage: string;

  constructor(public  formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.emailCtrl = formBuilder.control('', Validators.required);
    this.passwordCtrl = formBuilder.control('', Validators.required);

    this.loginForm = formBuilder.group({
      email: this.emailCtrl,
      password: this.passwordCtrl,
    });
  }

  ngOnInit(): void {
    if (this.authenticationService.isLogged()) {
      this.router.navigate(['home']).then();
    }
  }

  onSubmit() {
    this.authenticationService.login(this.loginForm.value).subscribe(user => {
      this.authenticationService.user = user;
      localStorage.setItem('token', user.token);
    }, (error) => {
      switch (error.status) {
        case 401:
          this.errorMessage = 'Email or password is wrong!';
          break;
        case 400:
          this.errorMessage = 'Fields can\'t be empty!';
      }
    });
  }
}
