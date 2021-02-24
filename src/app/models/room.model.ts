export interface RoomModel {
  _id: string;
  createDate: Date;
  closeDate: Date;
  players: any[];
  code: number;
  quizId: string;
  isStart: boolean;
}
