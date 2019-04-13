import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { BaseService } from './base.service';
import firebase from 'firebase';

export class LoginService extends BaseService<UserModel> {
  public entityModel = UserModel;
  public serviceEndpoint: string = 'login';
  private _user: UserModel;
  private _loggedIn: BehaviorSubject<string>;

  constructor() {
    super();
    this._loggedIn = new BehaviorSubject<string>(null);
  }

  public login(login: string, password: string): Observable<UserModel> {
    const loginSubject = new ReplaySubject<UserModel>(1);
    firebase.auth().signInWithEmailAndPassword(login, password).then(
      (userCredential: any) => {
        this._user = new UserModel(userCredential.user);
        this._loggedIn.next(userCredential.user.uid);
        loginSubject.next(this._user);
      },
      () => loginSubject.next(null)
    );

    return loginSubject.asObservable();
  }

  public changeUsername(username: string): Observable<UserModel> {
    const currentUser = firebase.auth().currentUser;

    return Observable.fromPromise(currentUser.updateProfile({
      displayName: username,
      photoURL: null
    }).then(() => new UserModel(currentUser)))
      .do((user: UserModel) => (this._user = user));
  }

  public logout(): Observable<boolean> {
    this._loggedIn.next(null);
    this._user = null;
    firebase.auth().signOut();

    return Observable.of(true);
  }

  public isLoggedIn(): Observable<string> {
    return this._loggedIn.asObservable();
  }

  public get user(): UserModel {
    return this._user;
  }
}
