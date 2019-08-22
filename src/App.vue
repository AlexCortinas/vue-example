<template>
  <v-app>
    <!-- Notificaciones usando vue-notification -->
    <notifications :max="3" :width="400" position="top center" />

    <!-- Menú lateral -->
    <v-navigation-drawer v-model="app.drawer" app>
      <!-- Si hay usuario se muestra su info y una imagen (mock) -->
      <template v-slot:prepend>
        <v-list-item two-line v-if="isLogged">
          <v-list-item-avatar>
            <img
              src="https://www.dropbox.com/s/lxnmktt5uw5hcqx/person.png?raw=1"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.login }}</v-list-item-title>
            <v-list-item-subtitle
              >Logged as {{ user.authority }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider v-if="isLogged" />

      <v-list dense>
        <v-list-item to="/login" v-if="!isLogged">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Enlazando una ruta usando el nombre en vez del path. Esto permite
             añadir parámetros si fuera necesario directamente desde el HTML. -->
        <v-list-item :to="{ name: 'Home' }" exact>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/outro">
          <v-list-item-icon>
            <v-icon>mdi-image-broken</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Wrong link</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/posts">
          <v-list-item-icon>
            <v-icon>mdi-post</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Posts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/postsalt">
          <v-list-item-icon>
            <v-icon>mdi-post</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Posts (alt) </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/about">
          <v-list-item-icon>
            <v-icon>mdi-information-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append v-if="isLogged">
        <div class="pa-2">
          <v-btn block @click="logout()">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Barra horizontal superior -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        @click.stop="app.drawer = !app.drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Vue Example</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn active-class="hide-active" icon to="/login" v-if="!isLogged">
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn icon @click="logout()" v-if="isLogged">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <!-- Contenido gestionado por vue-router -->
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import store from "./common/store";
import auth from "./common/auth";

export default {
  data: () => ({
    app: store.state.app,
    user: store.state.user
  }),
  computed: {
    isLogged() {
      return this.user.logged;
    }
  },
  methods: {
    logout() {
      auth.logout();
      // Después de hacer logout nos vamos a home
      if (this.$router.currentRoute.name != "Home") {
        this.$router.push({ name: "Home" });
      }
    }
  }
};
</script>

<style lang="scss" src="./App.scss"></style>
