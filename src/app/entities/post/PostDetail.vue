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
          :to="{ name: 'PostUpdate', params: { id: post.id }}"
          variant="primary">Edit</b-btn>
      </div>
      <h3>{{ post.title }}</h3>
      <h5>{{ author && author.name }}</h5>
      <hr>
      <div class="post">{{ post.body }}</div>
    </div>
  </LoadingPage>
</template>

<script>
import { HTTP } from '../../common/http-common'
import LoadingPage from '../../components/LoadingPage'

export default {
  components: { LoadingPage },
  data() {
    return {
      loading: false,
      post: null,
      error: null,
      allUsers: []
    }
  },
  computed: {
    author() {
      return this.allUsers.find(user => user.id == this.post.userId)
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    this.getUsers()
    this.fetchData()
  },
  methods: {
    getUsers() {
      HTTP.get('users')
      .then(response => this.allUsers = response.data)
      .catch(err => this.error = err.message)
    },
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
</style>
