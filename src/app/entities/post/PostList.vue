<template>
  <LoadingPage
    :loading="loading"
    :error="error">

    <div class="float-right">
      <b-btn
        v-if="isAdmin"
        :to="{ name: 'PostCreate' }"
        variant="primary">New</b-btn>
    </div>

    <div
      v-for="post in posts"
      :key="post.id">
      <router-link
        :to="{ name: 'PostDetail', params: { id: post.id } }">
        {{ post.title }}
      </router-link>
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
      posts: null,
      error: null
    }
  },
  computed: {
    isAdmin() {
      return auth.isAdmin()
    }
  },
  created() {
    this.loading = true

    HTTP.get('posts')
    .then(response => {
      this.posts = response.data
    })
    .catch(err => {
      this.error = err.message
    })
    .finally(() => this.loading = false)
  }
}
</script>
