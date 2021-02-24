import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../../ressources/room.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  innerWidth: number;
  code: number;
  error: boolean;

  constructor(private roomService: RoomService,
              private router: Router) { }

  ngOnInit() {
    this.error = false;
    this.innerWidth = window.innerWidth;
 }

  verifyCode() {
    this.roomService.joinRoom(this.code).subscribe(room => {
        sessionStorage.setItem('roomId', room._id);
        this.router.navigate(['/room', room._id]).then();
    });
  }

}
