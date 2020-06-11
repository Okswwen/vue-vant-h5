<template>
  <div class="search">
    <van-cell-group>
      <van-field v-model="field" label="文本" placeholder="请输入要搜索的关键字。。。" />
      <van-search v-model="search_value" placeholder="请输入搜索关键词" />
    </van-cell-group>
    <div class="area_list">
      <ul v-for="item in areaList" :key="item.id">
        <li @click="updateAddress(item)">
          <h4>{{item.name}}</h4>
          <p>{{item.district}}{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  beforeRouterEnter(to, from, next){
    next(vm => {
      vm.city = to.params.city || '广州'
    })
  },
  data(){
    return {
      field: '',
      search_value: '',
      city: '',
      areaList: [],
    }
  },
  watch: {
    search_value() {
      this.getSearchValue()
    }
  },
  created() {
  },
  methods: {
    updateAddress(item){
      this.$store.dispatch('setAddress', item.district + item.address)
    },
    getSearchValue() {
      const _self = this
      AMap.plugin('AMap.Autocomplete', function(){
      // 实例化Autocomplete
      var autoOptions = {
        //city 限定城市，默认全国
        city: '全国'
      }
      var autoComplete= new AMap.Autocomplete(autoOptions);
      autoComplete.search(_self.search_value, function(status, result) {
        // 搜索成功时，result即是对应的匹配数据
        _self.areaList = result.tips
      })
    })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
