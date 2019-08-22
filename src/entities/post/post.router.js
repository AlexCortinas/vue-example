import PostList from "./PostList";
import PostListAlt from "./PostListAlt";

const routes = [
  {
    name: "PostList",
    path: "/posts",
    component: PostList,
    meta: { public: true }
  },
  {
    name: "PostListAlt",
    path: "/postsalt",
    component: PostListAlt,
    meta: { public: true }
  },
  // /posts/new debe colocarse antes de /posts/:id porque si no vue-router
  // interpreta "new" como si fuera el id.
  //
  // Una forma de evitar este problema es usar una expresión regular para
  // limitar los valores que son interpretados. Por ejemplo, usando el path
  // /posts/:id(\\d+), vue-router espera que :id sea numérico.
  {
    name: "PostCreate",
    path: "/posts/new",
    component: () => import("./PostForm"),
    meta: { authority: "ADMIN" }
  },
  {
    name: "PostDetail",
    path: "/posts/:id",
    // carga dinámica del componente cuando hace falta
    component: () => import("./PostDetail")
  },
  {
    name: "PostUpdate",
    path: "/posts/:id/update",
    component: () => import("./PostForm"),
    meta: { authority: "ADMIN" }
  }
];

export default routes;
