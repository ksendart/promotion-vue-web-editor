import Vue from 'vue';

import { VueEditor } from 'vue2-editor';
import Component from 'vue-class-component';
import { Prop as prop } from 'vue-property-decorator';
import { DocumentModel } from '@/core/models/document.model';
import { UserModel } from '@/core/models/user.model';

@Component({
  components: {
    VueEditor,
  },
})
export default class DocumentFormComponent extends Vue {
  @prop(UserModel) public user: UserModel;
  @prop(DocumentModel) public document: DocumentModel;

  private _wait = false;

  public submit() {
    if (!this._wait) {
      this._wait = true;
      setTimeout(() => {
        this._saveDocument();
        this._wait = false;
      }, 5000);
    }
  }

  private _saveDocument() {
    this.$emit('saveDocument', this.document);
  }
}
