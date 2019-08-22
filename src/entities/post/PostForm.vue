<template>
  <div>
    <v-form ref="form" v-model="valid" @submit="save">
      <v-layout justify-center>
        <v-card width="50%">
          <v-card-title>
            <v-text-field
              v-model="post.title"
              label="Title"
              :rules="requiredField"
            ></v-text-field>

            <v-select
              v-model="post.author"
              :items="users"
              item-text="login"
              return-object
              label="Author"
              :rules="requiredField"
            ></v-select>
          </v-card-title>
          <v-card-text>
            <v-select
              v-model="post.tags"
              :items="tags"
              item-text="name"
              label="Tags"
              return-object
              multiple
              required
            ></v-select>

            <v-textarea
              v-model="post.body"
              label="Body"
              rows="7"
              :rules="requiredField"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" type="submit">
              Submit
            </v-btn>
            <v-btn color="warning" @click="remove()" v-if="post.id">
              Remove
            </v-btn>
            <v-btn @click="back()">
              Back
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import RepositoryFactory from "@/repositories/RepositoryFactory";
const PostsRepository = RepositoryFactory.get("posts");
const UsersRepository = RepositoryFactory.get("users");
const TagsRepository = RepositoryFactory.get("tags");

export default {
  data() {
    return {
      post: {},
      error: null,
      valid: null,
      users: [],
      tags: [],
      requiredField: [v => !!v || "Field is required"]
    };
  },
  async created() {
    this.users = await UsersRepository.getAll();
    this.tags = await TagsRepository.getAll();

    if (this.$route.params.id) {
      this.post = await PostsRepository.get(this.$route.params.id);
    } else {
      this.post = {};
    }
  },
  methods: {
    async save() {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        const savedPost = await PostsRepository.save(this.post);
        this.$router.replace({
          name: "PostDetail",
          params: { id: savedPost.id }
        });
      } catch (err) {
        this.$notify({
          text: err.response.data.message,
          type: "error"
        });
      }
    },
    async remove() {
      await PostsRepository.delete(this.post.id);
      this.$router.replace({ name: "PostList" });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
