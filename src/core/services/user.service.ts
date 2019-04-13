import { Observable } from 'rxjs/Observable';
import { UserModel } from '../models/user.model';
import { BaseService } from './base.service';

export class UserService extends BaseService<UserModel> {
  public entityModel = UserModel;

  public serviceEndpoint: string = 'user';

  public getUser(id: number): Observable<UserModel> {
    return this.get(id);
  }
}
