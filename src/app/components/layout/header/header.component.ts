import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../ressources/authentication.service';
import {UserService} from '../../../ressources/user.service';
import {RoleModel} from '../../../models/role.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMobile: boolean;
  code: number;
  error: boolean;
  isAdmin: boolean = false;
  role = new RoleModel();

  constructor(public authenticationService: AuthenticationService,
              public userService: UserService) { }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 765;
    if(this.authenticationService.isLogged()) {
      if(localStorage.getItem('permissions') === this.role.get('ADMIN')){
        this.isAdmin = true;
      }
    }
 }

 clear() {
   sessionStorage.clear();
 }

 logout() {
    this.authenticationService.logout().subscribe(() => {
      localStorage.clear();
    });
 }
}
