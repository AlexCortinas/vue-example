<template>
  <v-layout text-center wrap>
    <v-flex mb-4>
      <h1 class="display-2 font-weight-bold">
        Welcome to the Vue Example!
      </h1>
    </v-flex>

    <v-flex xs12>
      <v-img
        :src="require('../assets/udc.png')"
        class="my-3"
        contain
        height="100"
      ></v-img>
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
</script>

<style scoped>
h1 {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
