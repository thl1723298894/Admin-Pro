export default {
  path: "/",
  name: "layout",
  component: () => import("@/layout/index.vue"),
  meta: {},
  redirect: "home",
  children: [
    {
      path: "home",
      name: "HomePage",
      component: () => import("@/views/home/index.vue"),
      meta: {},
      children: [],
    },
    {
      path: "role",
      name: "RolePage",
      component: () => import("@/views/role/index.vue"),
      meta: {},
      children: [],
    },
    {
      path: "user",
      name: "UserPage",
      component: () => import("@/views/user/index.vue"),
      meta: {},
      children: [],
    },
    {
      path: "auth",
      name: "AuthPage",
      component: () => import("@/views/auth/index.vue"),
      meta: {},
      children: [],
    },
  ],
};
