<template>
  <div>
    <h2>SSR 测试</h2>
    <h1>store item: {{item}}</h1>
  </div>
</template>

<script>
  export default {
    asyncData({store}){
      return store.dispatch('fetchItem')
    },
    computed:{
      item(){
        return this.$store.state.item
      }
    }
  }
</script>

<style scoped>
h2{
  font-size: 100px;
}
</style>