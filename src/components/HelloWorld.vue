<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>这是本地调整的</p>
    <div>服务器调整的内容</div>
    <van-button type="default">默认按钮</van-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    this.getLocation()
    
  },
  methods: {
    getLocation() {
      const _self = this
      AMap.plugin('AMap.Geolocation', function() {
      const geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,

      })
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', onComplete)
      AMap.event.addListener(geolocation, 'error', onError)

      function onComplete (data) {
        // data是具体的定位信息
        console.log(_self)
        _self.$store.dispatch('setLocation', data)
        _self.$store.dispatch('setAddress', data.formattedAddress)
      }

      function onError (data) {
        // 定位出错
        console.log(`%c定位出错： ${JSON.stringify(data)}`, 'color:blue;font-size: 14px;font-weight: 600;')
      }
})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
