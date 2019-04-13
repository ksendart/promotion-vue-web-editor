import { BaseModel } from './base.model';

export interface IDocument {
  id: number;
  ownerId: number;
  title: string;
  content: string;
  lastChangesAuthor: number;
  lastChangesDate: Date;
}

export class DocumentModel extends BaseModel implements IDocument {
  public id: number;
  public ownerId: number;
  public title: string;
  public content: string;
  public lastChangesAuthor: number;
  public lastChangesDate: Date;
}
