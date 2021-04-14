import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../ressources/authentication.service';
import {RoleModel} from '../../models/role.model';
import {CategoryService} from '../../ressources/category.service';
import {CategoryModel} from '../../models/category.model';
import {RoomService} from '../../ressources/room.service';
import {PlayerService} from "../../ressources/player.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isAdmin = new RoleModel();
  preview = false;
  newCategory: any;
  name: string;
  photoUrl: string;
  num: number;
  categories: CategoryModel[];
  item: string;

  constructor(public authentication: AuthenticationService,
              private categoryService: CategoryService,
              private playerService: PlayerService,
              private roomService: RoomService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  logout() {
    this.authentication.logout().subscribe(() => localStorage.clear());
  }

  showPreview() {
    this.newCategory = {
      name: this.name,
      num: this.num,
      photoUrl: this.photoUrl
    };
    this.preview = true;
  }

  addToProduction() {
    this.categoryService.insertCategory(this.newCategory).subscribe(() => alert('category added.'));
  }
  purgeClosedRooms() {
    this.roomService.purgeRooms().subscribe(() => alert('rooms are well purged.'));
  }

  purgePlayers() {
    this.playerService.deletePlayers().subscribe(() => alert('players are well purged.'));
  }
}
