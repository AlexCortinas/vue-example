<template>
  <div>
    <div class="float-right">
      <v-btn v-if="isAdmin" :to="{ name: 'PostCreate' }" color="primary">
        New
      </v-btn>
    </div>

    <div class="text-center clear">
      <h2>Blog Posts</h2>
      <div class="caption">
        Data fetched <span class="font-weight-bold">before</span> navigation
      </div>
      <div v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">
          {{ post.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "../../common/auth";
import RepositoryFactory from "@/repositories/RepositoryFactory";
const PostsRepository = RepositoryFactory.get("posts");

// Carga dinámica de datos antes de cargar la ruta:
// https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-before-navigation
export default {
  data: () => ({
    posts: []
  }),
  // beforeRouteUpdate(to, from, next) {
  // Este hook no hace falta porque la vista no tiene ningún parámetro, entonces nunca se actualiza.
  // },
  async beforeRouteEnter(to, from, next) {
    const posts = await PostsRepository.getAll();
    next(vm => vm.setData(posts));
  },
  computed: {
    isAdmin() {
      return auth.isAdmin();
    }
  },
  methods: {
    setData(data) {
      this.posts = data;
    }
  }
};
</script>

<style scoped>
.clear {
  clear: both;
}
</style>
