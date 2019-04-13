import Vue from 'vue';
import Component from 'vue-class-component';
import {
  documentServiceInstance,
  loginServiceInstance
} from '@/core/services/constants';
import { Provide } from 'vue-property-decorator';
import { LoginService } from '@/core/services/login.service';
import { UserModel } from '@/core/models/user.model';
import { DocumentService } from '@/core/services/document.service';
import { DocumentModel } from '@/core/models/document.model';

@Component({})
export default class HelloComponent extends Vue {
  @Provide() public loginService: LoginService = loginServiceInstance;
  @Provide() public documentService: DocumentService = documentServiceInstance;
  public documents: DocumentModel[] = [];
  public user: UserModel = null;
  public username: string = '';
  public showModal = false;

  public created() {
    this.user = this.loginService.user;
    this.username = this.user.displayName;
    this.getDocumentList();
  }

  public openModal() {
    this.showModal = true;
  }

  public changeUsername() {
    this.loginService.changeUsername(this.username).subscribe(() => {
      this.user = this.loginService.user;
    });
  }

  public logOut() {
    this.loginService.logout().subscribe(() => {
      this.user = null;
      this.$router.push('/login');
    });
  }

  public getDocumentList() {
    this.documentService.list().subscribe((documents) => {
      this.documents = documents;
    });
  }
}
