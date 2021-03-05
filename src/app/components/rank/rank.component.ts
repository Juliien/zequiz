import { Component, OnInit } from '@angular/core';
import {UserService} from '../../ressources/user.service';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  users: UserModel[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getRanks().subscribe(ranks => this.users = ranks);
  }

}
