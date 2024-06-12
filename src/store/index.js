import {createStore} from "vuex";
import postModule from "@/store/post-module";

export default createStore({
   modules: {
      post: postModule
   }
})