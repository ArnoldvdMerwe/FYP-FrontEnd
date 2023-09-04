const routes = [
  {
    path: "/",
    redirect: { path: "/dashboard" },
    meta: { transition: "fade" },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("pages/DashboardPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    meta: { transition: "fade" },
    component: () => import("layouts/LoginRegisterLayout.vue"),
    children: [
      {
        path: "/login",
        meta: { transition: "slide-left" },
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "/register",
        meta: { transition: "slide-right" },
        component: () => import("pages/RegisterPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
