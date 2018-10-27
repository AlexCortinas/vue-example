<template>
  <div id="app">
    <notifications
      :max="3"
      :width="400"
      position="top center"/>
    <MenuBar/>
    <router-view class="content"/>
  </div>
</template>

<script>
import MenuBar from './components/MenuBar'

export default {
  components: { MenuBar }
}
</script>

<style scoped lang="scss">
  #app {
    color: #56b983;
  }

  .notification {
    margin: 10px;
    margin-bottom: 0;
    border-radius: 3px;
    font-size: 13px;
    padding: 10px 20px;
    color: #495061;
    background: #EAF4FE;
    border: 1px solid #D4E8FD;

    .error {
      background: #000000;
    }

    .notification-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 10px;
      color: #2589F3;
    }
  }
</style>
