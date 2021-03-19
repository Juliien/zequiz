export interface PlayerModel {
  _id: string;
  nickname: string;
  photoUrl: string;
  isOwner: boolean;
  isReady: boolean;
  score: number;
  createDate: string;
  closeDate: string;
}
