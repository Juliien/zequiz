import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../ressources/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public authentication: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authentication.logout().subscribe(() => localStorage.clear())
  }
}
