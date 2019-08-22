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
        Data fetched <span class="font-weight-bold">after</span> navigation
      </div>
      <div v-for="post in posts" :key="post.id">
        <div>
          <div>
            <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">
              {{ post.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "../../common/auth";
import RepositoryFactory from "@/repositories/RepositoryFactory";
const PostsRepository = RepositoryFactory.get("posts");

export default {
  data: () => ({
    posts: []
  }),
  async created() {
    this.posts = await PostsRepository.getAll();
  },
  computed: {
    isAdmin() {
      return auth.isAdmin();
    }
  }
};
</script>

<style scoped>
.clear {
  clear: both;
}
</style>
