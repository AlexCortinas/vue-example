<template>
  <LoadingPage
    :loading="loading"
    :error="error">

    <div class="float-right">
      <b-btn
        variant="primary"
        @click="back()">Back</b-btn>
      <b-btn
        variant="primary"
        @click="save()">Submit</b-btn>
    </div>

    <b-form
      v-if="post"
      class="app-form"
      @submit="save">

      <b-form-group
        label="Title:"
        label-for="title">
        <b-form-input
          id="title"
          v-model="post.title"
          type="text"
          required
          placeholder="Enter title"/>
      </b-form-group>

      <b-form-group
        label="Author:"
        label-for="author">
        <b-form-select
          id="author"
          :options="users"
          v-model="post.author"
          required/>
      </b-form-group>

      <b-form-group
        label="Tags:"
        label-for="tags">
        <b-form-select
          id="tags"
          :options="tags"
          v-model="post.tags"
          multiple/>
      </b-form-group>

      <b-form-group
        label="Body:"
        label-for="body">
        <b-form-textarea
          id="body"
          v-model="post.body"
          :rows="3"
          :max-rows="6"
          required
          placeholder="Enter body"/>
      </b-form-group>
    </b-form>
  </LoadingPage>
</template>

<script>
import { HTTP } from '../../common/http-common'
import LoadingPage from '../../components/LoadingPage'

export default {
  components: { LoadingPage },
  data() {
    return {
      post: {},
      error: null,
      loading: false,
      allUsers: [],
      allTags: []
    }
  },
  computed: {
    users() {
      return this.allUsers.map(user => {
        return {
          text: user.login,
          value: user
        }
      })
    },
    tags() {
      return this.allTags.map(tag => {
        return {
          text: tag.name,
          value: tag
        }
      })
    }
  },
  created() {
    this.getUsers()
    this.getTags()
    if (this.$route.params.id) {
      this.loading = true

      HTTP.get(`posts/${this.$route.params.id}`)
      .then(response => this.post = response.data)
      .catch(err => this.error = err.message)
      .finally(() => this.loading = false)
    } else {
      this.post = {}
    }
  },
  methods: {
    getUsers() {
      HTTP.get('users')
      .then(response => this.allUsers = response.data)
      .catch(err => this.error = err.message)
    },
    getTags() {
      HTTP.get('tags')
      .then(response => this.allTags = response.data)
      .catch(err => this.error = err.message)
    },
    save() {
      if (this.$route.params.id) {
        HTTP.put(`posts/${this.$route.params.id}`, this.post)
        .then(this._successHandler)
        .catch(this._errorHandler)
      } else {
        HTTP.post('posts', this.post)
        .then(this._successHandler)
        .catch(this._errorHandler)
      }
    },
    back() {
      this.$router.go(-1)
    },
    _successHandler(response) {
      this.$router.replace({ name: 'PostDetail', params: { id: response.data.id }})
    },
    _errorHandler(err) {
      this.error = err.response.data.message
    }
  }
}
</script>
