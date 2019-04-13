import firebase from 'firebase';
import {BaseModel} from '@/core/models/base.model';
import {BaseService} from '@/core/services/base.service';
import { Observable } from 'rxjs/Rx';

class TestModel extends BaseModel {}

class TestBaseService extends BaseService<TestModel> {
  public serviceEndpoint: string = '/test-endpoint';
  public entityModel = TestModel;
}

class TestFirebaseFireStore {
  public collection(...args: any[]) {
    return this;
  }
  public doc(...args: any[]) {
    return this;
  }
  public set(...args: any[]) {
    return this;
  }
  public add(...args: any[]) {
    return this;
  }
  public where() {
    return this;
  }
  public get() {
    return this;
  }
  public then(...args: any[]) {
    return this;
  }
}

describe('BaseService', () => {
  let service: TestBaseService;
  const testFirebaseFireStore = new TestFirebaseFireStore();

  beforeAll(() => {
    jest.mock('firebase');
    jest.mock('rxjs');
  });

  beforeEach(() => {
    service = new TestBaseService();
    spyOn(firebase, 'firestore').and.returnValue(testFirebaseFireStore);
    spyOn(Observable, 'from').and.callFake((arg) => Observable.of(arg));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get api url', () => {
    expect(service.getApiUrl).toEqual('/test-endpoint');
  });

  it('should return an object as a response for get request', () => {
    const mock = {  id: 1 };
    spyOn(testFirebaseFireStore, 'then').and.returnValue(Promise.resolve(mock));

    service.get(1).subscribe((result) => expect(result).toEqual(new TestModel(mock)));
  });

  it('should return true as a response for successful save request', () => {
    const mock = {  id: 1 };
    spyOn(testFirebaseFireStore, 'then').and.returnValue(Promise.resolve());

    service.save(mock).subscribe((result) => expect(result).toBeTruthy());
  });

  it('should return false as a response for failed save request', () => {
    const mock = {  id: 1 };
    spyOn(testFirebaseFireStore, 'then').and.returnValue(Promise.reject('fail'));

    service.save(mock).subscribe((result) => expect(result).toBeFalsy());
  });

  it('should return true as a response for successful save request', () => {
    const mock = {  name: '1' };
    spyOn(testFirebaseFireStore, 'then').and.returnValue(Promise.resolve());

    service.save(mock).subscribe((result) => expect(result).toBeTruthy());
  });

  it('should return false as a response for failed save request', () => {
    const mock = {  name: '1' };
    spyOn(testFirebaseFireStore, 'then').and.returnValue(Promise.reject('fail'));

    service.save(mock).subscribe((result) => expect(result).toBeFalsy());
  });

  it('should return array as a response for list request', () => {
    const mock = {  id: 1 };
    spyOn(testFirebaseFireStore, 'then').and.returnValue(Promise.resolve([mock]));

    service.list({  name: '1' }).subscribe((result) => {
      expect(result).toBe([new TestModel(mock)]);
      expect(testFirebaseFireStore.where).toHaveBeenCalledWith('name', '==', '1');
    });
  });

  it('should return array as a response for list request', () => {
    const mock = {  id: 1 };
    spyOn(testFirebaseFireStore, 'then').and.returnValue(Promise.resolve([mock]));

    service.list().subscribe((result) => {
      expect(result).toBe([new TestModel(mock)]);
      expect(testFirebaseFireStore.where).not.toHaveBeenCalled();
    });
  });

  it('should create model', () => {
    const mock = {  name: '1' };

    expect(service.createModel(mock)).toEqual(new TestModel(mock));
  });
});
