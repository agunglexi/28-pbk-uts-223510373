// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Todo from "../views/Todo.vue";
import Post from "../views/Post.vue";
import Album from "../views/Album.vue";
import AlbumDetail from "../views/AlbumDetail.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "mainLayout",
      component: MainLayout,
      children: [
        {
          path: "/todo",
          name: "Todo",
          component: Todo,
        },
        {
          path: "/post",
          name: "Post",
          component: Post,
        },
        {
          path: "/album",
          name: "Album",
          component: Album,
        },
        {
          path: "photo/:photoId",
          name: "AlbumDetail",
          component: AlbumDetail,
        },
      ],
    },
  ],
});

export default router;
