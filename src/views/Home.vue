<template>
  <div class="home">
    <HelloWorld msg="11"/>
    <p>当前地址：{{address}}</p>
    <search-value/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SearchValue from '@/components/search.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    SearchValue
  },
  computed: {
    address() {
      return this.$store.getters.address
    }
  },
}
</script>
