<template>
  <div>
    <Header />
    <Container />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import Container from './components/Container.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Header,
    Container
  },
  data () {
    return {
      title: "First vue project",
      showHello: true
    }
  },
  methods: {
    toggleHello () {
      this.showHello = !this.showHello
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
