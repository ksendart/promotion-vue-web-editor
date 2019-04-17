import { BaseModel } from './base.model';

export interface IMessage {
  id: number;
  authorId: number;
  documentId: number;
  text: string;
  date: Date;
}

export class MessageModel extends BaseModel implements IMessage {
  public id: number;
  public documentId: number;
  public authorId: number;
  public text: string;
  public date: Date;

  public get author(): string {
    return this.authorId.toString().slice(0, 2).toUpperCase();
  }
}
