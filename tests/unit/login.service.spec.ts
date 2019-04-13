import { UserModel } from '@/core/models/user.model';
import { LoginService } from '@/core/services/login.service';

import firebase from 'firebase';
import { Observable } from 'rxjs/Rx';

class TestFirebaseFireStore {
  public currentUser;
  public auth() {
    return this;
  }
  public signOut() {
    return this;
  }
  public signInWithEmailAndPassword(...args: any[]) {
    return this;
  }
}

describe('LoginService', () => {
  let service: LoginService;
  const testFirebaseFireStore = new TestFirebaseFireStore();

  beforeAll(() => {
    jest.mock('firebase');
    jest.mock('rxjs');
  });

  beforeEach(() => {
    service = new LoginService();
    spyOn(firebase, 'auth').and.returnValue(testFirebaseFireStore);
    spyOn(Observable, 'from').and.callFake((arg) => Observable.of(arg));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login and return current user', () => {
    const mock = {uid: 1, displayName: '1'};
    spyOn(testFirebaseFireStore, 'signInWithEmailAndPassword').and.returnValue(Promise.resolve({ user: mock}));

    service.login('login', 'password')
      .subscribe((result) => {
        expect(result).toEqual(new UserModel(mock));
        expect(service.isLoggedIn()).toEqual(Observable.of(1));
      });
  });

  it('should not login and return null', () => {
    spyOn(testFirebaseFireStore, 'signInWithEmailAndPassword').and.returnValue(Promise.reject(fail));

    service.login('login', 'password')
      .subscribe((result) => expect(result).toBeNull());
  });

  it('should change users name and return current user', () => {
    testFirebaseFireStore.currentUser = {id: 1, displayName: '1', updateProfile: () => ({})};
    spyOn(testFirebaseFireStore.currentUser, 'updateProfile').and.returnValue(Promise.resolve());

    service.changeUsername('username')
      .subscribe((result) => expect(result).toEqual(new UserModel({id: 1, displayName: '1'})));
  });

  it('should not change users name and return error', () => {
    testFirebaseFireStore.currentUser = { updateProfile: () => ({})};
    spyOn(testFirebaseFireStore.currentUser, 'updateProfile').and.returnValue(Promise.reject('fail'));

    service.changeUsername('username')
      .catch((error) => expect(error).toEqual('fail'));
  });

  it('should logout and return null', () => {
    service.logout()
      .subscribe((result) => {
        expect(result).toBeTruthy();
        expect(service.user).toBeNull();
      });
  });
});
