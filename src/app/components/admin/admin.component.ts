import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../ressources/authentication.service';
import {RoleModel} from '../../models/role.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isAdmin: RoleModel;

  constructor(public authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.isAdmin.get('ADMIN');
  }

  logout() {
    this.authentication.logout().subscribe(() => localStorage.clear());
  }
}
