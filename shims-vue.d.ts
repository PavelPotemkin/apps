import { Store } from 'vuex'
import axios from "@/plugins/axios";
import {IRootState} from "@/store/root/interfaces";

declare module '*.vue' {
  // @ts-ignore
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  // eslint-disable-next-line no-unused-vars
  interface ComponentCustomProperties {
    $store: Store<IRootState>
    $http: typeof axios
  }
}
