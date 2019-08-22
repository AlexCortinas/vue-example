<template>
  <div class="post">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post">
      <v-layout justify-center>
        <v-card width="50%">
          <v-card-title
            ><span>{{ post.title }}</span>
            <v-spacer />
            <span>by {{ post.author.login }}</span></v-card-title
          >

          <v-card-text>
            <div class="tags">
              {{ tagsAsString }}
            </div>
            <v-divider />
            <div class="post">
              {{ post.body }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              v-if="isAdmin"
              :to="{ name: 'PostUpdate', params: { id: post.id } }"
              color="primary"
            >
              Edit
            </v-btn>
            <v-btn @click="back()">
              Back
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </div>
  </div>
</template>

<script>
import auth from "../../common/auth";
import RepositoryFactory from "@/repositories/RepositoryFactory";
const PostsRepository = RepositoryFactory.get("posts");

export default {
  data: () => ({
    loading: false,
    post: null,
    error: null
  }),
  beforeRouteUpdate(to, from, next) {
    this.fetchData(to.params.id);
    next();
  },
  created() {
    this.fetchData(this.$route.params.id);
  },
  computed: {
    isAdmin() {
      return auth.isAdmin();
    },
    tagsAsString() {
      return this.post.tags.map(t => t.name).join(", ");
    }
  },
  methods: {
    async fetchData(id) {
      this.error = this.post = null;
      this.loading = true;

      try {
        this.post = await PostsRepository.get(id);
      } catch (err) {
        this.error = err.response.data.message;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.post {
  white-space: pre;
}

.tags {
  font-style: italic;
}
</style>
