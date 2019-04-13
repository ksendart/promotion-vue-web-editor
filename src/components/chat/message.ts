import Vue from 'vue';

import Component from 'vue-class-component';
import { Prop, Provide } from 'vue-property-decorator';
import { MessageModel } from '@/core/models/message.model';
import { loginServiceInstance } from '@/core/services/constants';
import { LoginService } from '@/core/services/login.service';

@Component({})
export default class MessageComponent extends Vue {
  @Provide() public loginService: LoginService = loginServiceInstance;
  public isUserAuthor: boolean = false;
  @Prop(MessageModel) public message: MessageModel;

  public created() {
    const id = this.getUserId();
    if (id === this.message.authorId) {
      this.isUserAuthor = true;
    }
  }

  public getUserId() {
    const user = this.loginService.user;

    return user && user.uid;
  }
}
