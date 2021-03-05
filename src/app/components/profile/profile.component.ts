import { Component, OnInit } from '@angular/core';
import {UserService} from '../../ressources/user.service';
import {UserModel} from '../../models/user.model';
import {RoleModel} from '../../models/role.model';
import {consoleTestResultHandler} from 'tslint/lib/test';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserModel;
  roles = new RoleModel();
  role: string;
  errMsg: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserById().subscribe(user => {
      this.user = user;
      switch (this.user.permissionLevel.toString()) {
        case this.roles.get('ADMIN'):
          this.role = 'Admin';
          break;
        case this.roles.get('PAID'):
          this.role = 'Premium';
          break;
        case this.roles.get('FREE'):
          this.role = 'Free';
          break;
        default:
          this.role = 'No plan';
          break;
      }
    },(error) => {
      if(error.status === 401) {
        this.errMsg = "Your session has expired ! Automatic logout in 3 seconds";
        this.sleep(3000).then(() => localStorage.clear());
      }
    });
  }

  sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

}
