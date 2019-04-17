import { Observable } from 'rxjs';
import { MessageModel } from '../models/message.model';
import { BaseService } from './base.service';

export class MessageService extends BaseService<MessageModel> {
  public entityModel = MessageModel;

  public serviceEndpoint: string = 'messages';

  public getMessages(documentId: number): Observable<MessageModel[]> {
    return this.list({ documentId }, { date: 'asc' });
  }

  public saveMessage(message: MessageModel): Observable<boolean> {
    return this.save({ ...message, date: new Date() });
  }
}
