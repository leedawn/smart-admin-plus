import { h } from "vue";
import Modal from "./modal";

function createModal() {
  return h(Modal, null, { default: () => "default slot" });
}

export default createModal;
