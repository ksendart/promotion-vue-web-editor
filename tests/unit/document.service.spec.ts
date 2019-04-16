import { DocumentModel } from '@/core/models/document.model';
import { DocumentService } from '@/core/services/document.service';
import { Observable } from 'rxjs/Rx';

describe('DocumentService', () => {
  let service: DocumentService;
  const mock1: DocumentModel = new DocumentModel({id: 1, text: 'text'});
  const mock2: DocumentModel = new DocumentModel({
    id: 1, lastChangesAuthor: 1, lastChangesDate: new Date(), text: 'text',
  });

  beforeEach(() => {
    service = new DocumentService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save document', () => {
    spyOn(service, 'getDocument').and.returnValue(Observable.of(mock1));
    spyOn(service, 'save').and.returnValue(Observable.of(true));
    service.saveDocument(mock1)
      .subscribe((res) => {
        expect(res).toBeTruthy();
      });
  });

  it('should not save document', () => {
    spyOn(service, 'getDocument').and.returnValue(Observable.of(mock1));
    spyOn(service, 'save').and.throwError('fail');
    service.saveDocument(mock1)
      .subscribe(() => ({}), (error) => {
        expect(error).toEqual('Error during saving..');
      });
  });

  it('should abort document saving due to conflicts', () => {
    spyOn(service, 'getDocument').and.returnValue(Observable.of(mock1));
    spyOn(service, 'save').and.returnValue(Observable.of(true));
    service.saveDocument(mock2)
      .subscribe((res) => {
        expect(res).toBeFalsy();
      });
  });

  it('should save document forced', () => {
    spyOn(service, 'getDocument').and.returnValue(Observable.of(mock1));
    spyOn(service, 'save').and.returnValue(Observable.of(true));
    service.saveDocument(mock2, true)
      .subscribe((res) => {
        expect(res).toBeTruthy();
      });
  });
});
