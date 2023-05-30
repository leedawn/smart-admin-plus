import Component from "vue-class-component";

Component.registerHooks(["beforeRouteEnter"]);

import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class HelloWorld extends Vue {
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next();
  }
}
