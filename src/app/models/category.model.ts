export interface CategoryModel {
  _id: string;
  name: string;
  num: number;
  photoUrl: string;
  views: number;
  rate: number[];
  rateNumber: number;
  createDate: Date;
}
