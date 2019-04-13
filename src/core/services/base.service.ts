import { Observable } from 'rxjs';
import { BaseModel } from '../models/base.model';
import firebase from 'firebase';

export class BaseService<M extends BaseModel> {
  public baseUrl: string = '';
  public serviceEndpoint: string = '';

  protected entityModel: new(params: any) => M;

  public get getApiUrl(): string {
    return this.baseUrl + this.serviceEndpoint;
  }

  public get(id: number): Observable<M> {
    return Observable
      .from(firebase.firestore().collection(this.getApiUrl)
          .doc(id.toString()).get()
          .then((doc) => doc.data())
      )
      .map((res: any) => this.createModel(res))
      .catch((error) => Observable.throwError(error));
  }

  public save(params: any = {}): Observable<boolean> {
    return Observable
      .from(
        params.id ?
          firebase.firestore().collection(this.getApiUrl)
            .doc(params.id.toString()).set(params)
            .then(() => true)
            .catch(() => false) :
          firebase.firestore().collection(this.getApiUrl)
            .add(params)
            .then(() => true)
            .catch(() => false)
      )
      .catch((error) => Observable.throwError(error));
  }

  public list(params?: any): Observable<M[]> {
    const collection = firebase.firestore().collection(this.getApiUrl);
    let query;

    if (params) {
      Object.keys(params).forEach((key: string) => {
        query = collection.where(key, '==', params[key]);
      });
    }

    return Observable
      .from(
        (query || collection)
          .get()
          .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
      )
      .map((res: any) => res.map((item: any) => this.createModel(item)))
      .catch((error) => Observable.throwError(error));
  }

  public createModel(json?: any): M {
    return new this.entityModel(json);
  }
}
