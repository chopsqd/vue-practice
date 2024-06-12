import { createRouter, createWebHistory } from "vue-router";
import {AboutPage, MainPage, PostPage, PostsPage} from "@/pages";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/posts",
    component: PostsPage,
  },
  {
    path: "/posts/:id",
    component: PostPage,
  },
  {
    path: "/about",
    component: AboutPage,
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
