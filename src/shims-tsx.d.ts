import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
