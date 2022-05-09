import { createRouter, createWebHistory } from "vue-router";
import AbsenceView from "../views/AbsenceView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";

// import store user
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        authPage: true,
      },
    },
    {
      path: "/absence",
      name: "absence",
      component: AbsenceView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

// ini middleware dari token
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("access_token") != null;
  if (to.name === "login" && token) {
    next({
      name: "home",
    });
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

// ini middleware dari store user
// router.beforeEach(async (to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const userStore = useUserStore();
//     await userStore.fetchUser();
//     if (userStore.user) {
//       next();
//     } else {
//       next({
//         name: "login",
//       });
//     }
//   }

//   if (to.meta.authPage) {
//     const userStore = useUserStore();
//     await userStore.fetchUser();
//     if (!userStore.user) {
//       next();
//     } else {
//       next(from);
//     }
//   }
// });

export default router;
