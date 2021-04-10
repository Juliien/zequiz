import {PlayerModel} from './player.model';

export interface RoomModel {
  _id: string;
  players: PlayerModel[];
  categoryId: string;
  quiz: any;
  isStart: boolean;
  createDate: Date;
  closeDate: Date;
}
