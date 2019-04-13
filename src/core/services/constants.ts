import { LoginService } from './login.service';
import { MessageService } from './message.service';
import { DocumentService } from './document.service';

export let loginServiceInstance = new LoginService();
export let messageServiceInstance = new MessageService();
export let documentServiceInstance = new DocumentService();
