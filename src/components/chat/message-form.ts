import Vue from 'vue';

import Component from 'vue-class-component';
import { Provide } from 'vue-property-decorator';
import { MessageModel } from '@/core/models/message.model';
import { loginServiceInstance } from '@/core/services/constants';
import { LoginService } from '@/core/services/login.service';

@Component({})
export default class MessageFormComponent extends Vue {
  @Provide() public loginService: LoginService = loginServiceInstance;
  public message: MessageModel = new MessageModel({ text: '' });

  public getUserId() {
    const user = this.loginService.user;

    return user && user.uid;
  }

  public sendMessage() {
    this.message.authorId = this.getUserId();
    this.$emit('sendMessage', this.message);
    this.message.text = '';
  }
}
