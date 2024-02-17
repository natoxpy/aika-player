import { createRouter, createWebHistory } from "vue-router";
import ListenNow from "@/views/listenNow.vue";
import Browse from "@/views/browse.vue";
import Playlists from "@/views/playlists.vue";
import Musics from "@/views/musics/index.vue";
import Albums from "@/views/albums.vue";
import Artists from "@/views/artists.vue";
import SoundcloudImportsPage from "@/views/imports/soundcloud/page.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "ListenNow",
      component: ListenNow,
    },
    {
      path: "/browse",
      name: "Browse",
      component: Browse,
    },
    {
      path: "/playlists",
      name: "Playlists",
      component: Playlists,
    },
    {
      path: "/musics",
      name: "Musics",
      component: Musics,
    },
    {
      path: "/albums",
      name: "Albums",
      component: Albums,
    },
    {
      path: "/artists",
      name: "Artists",
      component: Artists,
    },
    {
      path: "/imports/soundcloud",
      name: "Soundcloud import",
      component: SoundcloudImportsPage,
    },
    //    {
    //      path: '/',
    //      name: 'home',
    //      component: HomeView
    //    },
    //    {
    //      path: '/about',
    //      name: 'about',
    //      // route level code-splitting
    //      // this generates a separate chunk (About.[hash].js) for this route
    //      // which is lazy-loaded when the route is visited.
    //      component: () => import('../views/AboutView.vue')
    //    }
  ],
});

export default router;
