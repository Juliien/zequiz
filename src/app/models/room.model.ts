import {QuizModel} from './quiz.model';

export interface RoomModel {
  _id: string;
  createDate: Date;
  closeDate: Date;
  players: string[];
  code: number;
  quizId: string;
  quiz: any;
  isStart: boolean;
}
