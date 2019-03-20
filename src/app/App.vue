<template>
  <div id="app">
    <MenuBar>
      <!-- -->
    </MenuBar>
    <router-view class="content">
      <!-- -->
    </router-view>
  </div>
</template>

<script>
import auth from './common/auth'
import MenuBar from './components/MenuBar'

export default {
  name: 'App',
  components: { MenuBar },
  data() {
    return {
      // enlazamos el objeto donde vamos a guardar los datos de autenticación
      // de esta forma se activa el data-binding y los podemos usar como
      // propiedades públicas en los componentes
      storeAuth: auth
    }
  },
  created() {
    // nada más ejecutar la aplicación comprobamos si estamos autenticados
    if (auth.getToken()) {
      auth.authenticate().catch(() => auth.logout())
    }
  }
}
</script>

<style scoped lang="scss">
  #app {
    color: #56b983;
  }
</style>
