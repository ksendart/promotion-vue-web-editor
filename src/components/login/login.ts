import Vue from 'vue';

import Component from 'vue-class-component';
import { Provide } from 'vue-property-decorator';
import { UserModel } from '@/core/models/user.model';
import { loginServiceInstance } from '@/core/services/constants';
import { LoginService } from '@/core/services/login.service';

@Component({
  name: 'login',
})
export default class LoginComponent extends Vue {
  @Provide() public loginService: LoginService = loginServiceInstance;
  public user: UserModel = null;
  public login: string = '';
  public password: string = '';
  public text: string = null;

  public created() {
    this.getLoggedInUser();
  }

  public submit() {
    this.text = '';
    if (this.login && this.password) {
      this.getUser().subscribe((user: UserModel) => {
        if (user) {
          this.user = user;
          this.$router.go(-1);
        } else {
          this.text = 'Incorrect login. Try "ksendart@yandex.ru" and "password1"';
        }
      });
    } else {
      this.text = 'Set login and password';
    }
  }

  public logOut() {
    this.loginService.logout().subscribe(() => {
      this.user = null;
    });
  }

  public getUser() {
    return this.loginService.login(this.login, this.password);
  }

  public getLoggedInUser() {
    this.user = this.loginService.user;
  }
}
