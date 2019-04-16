import Vue from 'vue';

import Component from 'vue-class-component';
import { Provide } from 'vue-property-decorator';
import {
  documentServiceInstance,
  loginServiceInstance
} from '@/core/services/constants';
import { LoginService } from '@/core/services/login.service';
import ChatComponent from '../chat/chat.vue';
import DocumentFormComponent from './document-form.vue';
import { UserModel } from '@/core/models/user.model';
import { DocumentService } from '@/core/services/document.service';
import { DocumentModel } from '@/core/models/document.model';
import { NotificationOptions } from 'vue-notification';

const successMessage: NotificationOptions = {
  title: 'Success',
  text: 'Saved!',
  type: 'success',
  group: 'saving',
};
const infoMessage: NotificationOptions = {
  title: 'Info',
  text: 'Saving...',
  type: 'info',
  group: 'saving',
};
const failMessage: NotificationOptions = {
  title: 'Fail',
  text: 'Not Saved!!',
  type: 'fail',
  group: 'saving',
};

@Component({
  components: {
    chat: ChatComponent,
    'document-form': DocumentFormComponent,
  },
})
export default class DocumentComponent extends Vue {
  @Provide() public loginService: LoginService = loginServiceInstance;
  @Provide() public documentService: DocumentService = documentServiceInstance;
  public showModal: boolean = false;

  public title: string = 'Create Document';
  public documentId: number;
  public document: DocumentModel = new DocumentModel({
    content: '',
    title: '',
  });
  private _user: UserModel;

  public created() {
    if (this.$route.name === 'edit') {
      this.title = 'Edit Document';
    }
    if (this.$route.params.id) {
      this.documentId = +this.$route.params.id;
      this.getDocument(this.documentId);
    } else {
      this.getNewDocId();
    }
    this.getUser();
  }

  public getUser() {
    this._user = this.loginService.user;
  }

  public getNewDocId() {
    this.documentService.list().subscribe((items) => {
      this.documentId = items.length + 1;
    });
  }

  public getDocument(id: number) {
    this.documentService.getDocument(id).subscribe((document) => {
      if (document) {
        this.document = document;
      } else {
        this.$router.push('/create');
        this.title = 'Create Document';
      }
    });
  }

  public handleError() {
    this.showModal = true;
  }

  public rejectChanges() {
    this.saveDocument(this.document, true);
  }

  public saveDocument(document: DocumentModel, rejectChanges: boolean) {
    document.lastChangesAuthor = this._user && this._user.uid;
    document.id = document.id || this.documentId;
    this.$notify(infoMessage);
    this.documentService.saveDocument(document, rejectChanges)
      .subscribe( (res) => {
          if (res) {
            this.$notify(successMessage);
          } else {
            this.handleError();
          }
        },
        () => this.$notify(failMessage)
      );
  }
}
