<template>
  <form @submit.prevent="userLogin">
    <div
      v-if="error"
      class="error">
      <pre>{{ error }}</pre>
    </div>
    <div class="form-group">
      <label for="username">Username</label>
      <input
        id="username"
        v-model="username"
        name="username"
        type="text"
        class="form-control"
        required>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        class="form-control"
        name="password"
        required>
    </div>
    <button
      type="submit"
      class="btn btn-primary">Log In</button>
  </form>
</template>

<script>
import auth from '../common/auth'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    userLogin() {
      auth.login({
        login: this.username,
        password: this.password
      })
      .then(response => {
        this.$router.go(-1)
      })
      .catch(err => {
        this.error = err.response.data.message
      })
    }
  }
}
</script>
