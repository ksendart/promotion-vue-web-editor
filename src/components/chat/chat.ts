import Vue from 'vue';

import Component from 'vue-class-component';
import { Provide } from 'vue-property-decorator';
import { MessageModel } from '@/core/models/message.model';
import {
  loginServiceInstance,
  messageServiceInstance
} from '@/core/services/constants';
import { LoginService } from '@/core/services/login.service';
import { MessageService } from '@/core/services/message.service';
import MessageFormComponent from './message-form.vue';
import MessageComponent from './message.vue';
import { Observable, Subject } from 'rxjs';

@Component({
  components: {
    message: MessageComponent,
    'message-form': MessageFormComponent
  }
})
export default class ChatComponent extends Vue {
  @Provide() public loginService: LoginService = loginServiceInstance;
  @Provide() public messageService: MessageService = messageServiceInstance;

  public messages: MessageModel[] = [];
  public documentId: number;

  private _destroy$: Subject<any>;

  public created() {
    this.documentId = +this.$route.params.id;
    this._destroy$ = new Subject<any>();
    this.getDocumentMessages(this.documentId);
  }

  public destroyed() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public getDocumentMessages(documentId: number) {
    Observable.timer(0, 5000)
      .switchMap(() =>
        this.messageService
          .getMessages(documentId)
      )
      .takeUntil(this._destroy$)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  public sendMessage(message: MessageModel) {
    message.documentId = this.documentId;
    this.messageService.saveMessage(message).subscribe(() => {
      // this.messages.push(new MessageModel(message));
    });
  }
}
