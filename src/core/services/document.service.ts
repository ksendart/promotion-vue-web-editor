import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { DocumentModel } from '../models/document.model';

export class DocumentService extends BaseService<DocumentModel> {
  public entityModel = DocumentModel;

  public serviceEndpoint: string = 'documents';

  public getDocument(id: number): Observable<DocumentModel> {
    return this.get(id);
  }

  public saveDocument(document: DocumentModel, rejectChanges: boolean = false): Observable<boolean> {
    return this.getDocument(document.id).switchMap((doc: DocumentModel) => {
      if (
        doc.lastChangesAuthor !== document.lastChangesAuthor &&
        doc.lastChangesDate > document.lastChangesDate &&
        !rejectChanges
      ) {
        return Observable.of(false);
      } else {
        return this.save({ ...document, lastChangesDate: new Date() });
      }
    }).catch(() => Observable.throwError('Error during saving..'));
  }
}
