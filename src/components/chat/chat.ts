import { Subscription } from 'rxjs/Rx';
import Vue from 'vue';

import Component from 'vue-class-component';
import { NotificationOptions } from 'vue-notification';
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

const failMessage: NotificationOptions = {
  title: 'Fail',
  text: 'Something goes wrong!!',
  type: 'fail',
  group: 'main',
};

@Component({
  components: {
    message: MessageComponent,
    'message-form': MessageFormComponent,
  },
})
export default class ChatComponent extends Vue {
  @Provide() public loginService: LoginService = loginServiceInstance;
  @Provide() public messageService: MessageService = messageServiceInstance;

  public messages: MessageModel[] = [];
  public documentId: number;

  private _destroy$: Subject<any>;
  private _polling$: Subscription;

  public created() {
    this.documentId = +this.$route.params.id;
    this._destroy$ = new Subject<any>();
    this.update();
  }

  public destroyed() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public update() {
    if (this._polling$) {
      this._polling$.unsubscribe();
    }

    this.getDocumentMessages(this.documentId);
  }

  public getDocumentMessages(documentId: number) {
    this._polling$ = Observable.timer(0, 5000)
      .switchMap(() =>
        this.messageService
          .getMessages(documentId)
      )
      .takeUntil(this._destroy$)
      .subscribe(
        (messages) => {
          this.messages = messages;
        },
        () => this.$notify(failMessage)
      );
  }

  public sendMessage(message: MessageModel) {
    message.documentId = this.documentId;
    this.messageService.saveMessage(message).subscribe(
      () => {
        this.update();
      },
    () => this.$notify(failMessage)
    );
  }
}
