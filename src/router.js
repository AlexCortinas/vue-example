import Vue from "vue";
import Router from "vue-router";

import auth from "./common/auth";
import store from "./common/store";
const user = store.state.user;
import { NotFound, Login, Home } from "./components";
import postRouter from "./entities/post/post.router";

Vue.use(Router);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { public: true, isLoginPage: true }
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { public: true }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "./components/About.vue"),
    meta: { public: true }
  },
  { path: "*", component: NotFound, meta: { public: true } }
];

// A las rutas definidas en este fichero les añadimos rutas importadas
const router = new Router({
  routes: routes.concat(postRouter)
});

router.beforeEach((to, from, next) => {
  // Lo primero que hacemos antes de cargar ninguna ruta es comprobar si
  // el usuario está autenticado (revisando el token)
  auth.isAuthenticationChecked.finally(() => {
    // por defecto, el usuario debe estar autenticado para acceder a las rutas
    const requiresAuth = !to.meta.public;

    const requiredAuthority = to.meta.authority;
    const userIsLogged = user.logged;
    const loggedUserAuthority = user.authority;

    if (requiresAuth) {
      if (userIsLogged) {
        if (requiredAuthority && requiredAuthority != loggedUserAuthority) {
          // usuario logueado pero sin permisos
          Vue.notify({
            text:
              "Access is not allowed for the current user. Try to log again.",
            type: "error"
          });
          auth.logout();
          next("/login");
        } else {
          // usuario logueado y con permisos adecuados
          next();
        }
      } else {
        // usuario no está logueado
        Vue.notify({
          text: "This page requires authentication.",
          type: "error"
        });
        next("/login");
      }
    } else {
      // página pública
      if (userIsLogged && to.meta.isLoginPage) {
        // si estamos logueados no hace falta volver a mostrar el login
        next({ name: "Home", replace: true });
      } else {
        next();
      }
    }
  });
});

export default router;
