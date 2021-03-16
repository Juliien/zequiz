export interface RoomModel {
  _id: string;
  createDate: Date;
  closeDate: Date;
  players: string[];
  categoryId: string;
  quiz: any;
}
