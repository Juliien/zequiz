import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMobile: boolean;
  code: number;
  error: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 765;
  }

  clear() {
    sessionStorage.clear();
  }

  goToHome() {
    this.clear();
    this.router.navigate(['home']).then();
  }

  openMenu() {
    document.getElementById('sideMenu').style.width = '100%';
  }

  closeMenu() {
    document.getElementById('sideMenu').style.width = '0';
    this.clear();
  }
}
