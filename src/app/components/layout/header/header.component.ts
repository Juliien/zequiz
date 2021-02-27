import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../../ressources/room.service';
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
  active: number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.error = false;
    this.isMobile = window.innerWidth <= 765;
    if (document.location.href === 'https://www.zequiz.net/#/home') {
      this.active = 0;
    } else if (document.location.href === 'https://www.zequiz.net/#/all') {
      this.active = 0;
    } else {
      this.active = -1;
    }
 }

 clear() {
   sessionStorage.clear();
 }

 goToCategories() {
    this.clear();
    this.active = 1;
    console.log(this.active);
    this.router.navigate(['/all']).then();
 }

  goToHome() {
    this.clear();
    this.active = 0;
    console.log(this.active);
    this.router.navigate(['/home']).then();
  }
}
