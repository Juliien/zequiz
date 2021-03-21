
export interface UserModel {
  _id: string;
  nickname: string;
  email: string;
  password: string;
  photoUrl: string;
  permissionLevel: number;
  token: string;
  createDate: string;
  closeDate: string;
}
