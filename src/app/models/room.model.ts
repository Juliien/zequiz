import {PlayerModel} from './player.model';

export interface RoomModel {
  _id: string;
  createDate: Date;
  closeDate: Date;
  players: PlayerModel[];
  categoryId: string;
  quiz: any;
}
