<template>
  <LoadingPage
    :loading="loading"
    :error="error">

    <div v-if="post">
      <div class="float-right">
        <b-btn
          variant="primary"
          @click="back()">Back</b-btn>
        <b-btn
          v-if="isAdmin"
          :to="{ name: 'PostUpdate', params: { id: post.id }}"
          variant="primary">Edit</b-btn>
      </div>

      <h3>{{ post.title }}</h3>
      <h5>{{ post.author.login }}</h5>
      <div class="tags">{{ tagsAsString }}</div>
      <hr>
      <div class="post">{{ post.body }}</div>
    </div>
  </LoadingPage>
</template>

<script>
import { HTTP } from '../../common/http-common'
import LoadingPage from '../../components/LoadingPage'
import auth from '../../common/auth'

export default {
  components: { LoadingPage },
  data() {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  computed: {
    isAdmin() {
      return auth.isAdmin()
    },
    tagsAsString() {
      return this.post.tags.map(t => t.name).join(', ')
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.error = this.post = null
      this.loading = true

      HTTP.get(`posts/${this.$route.params.id}`)
      .then(response => this.post = response.data)
      .catch(err => this.error = err.message)
      .finally(() => this.loading = false)
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
  .post {
    white-space: pre;
  }

  .tags {
    font-style: italic;
  }
</style>
