<template>
  <div class="home">
    <van-nav-bar title="首页" fixed />
    <!-- activeChannelIndex 绑定当前激活的标签页，使用索引 -->
    <van-tabs class="channel-tabs" v-model="activeChannelIndex">
      <van-tab title="标签 1">
        <!--
            下拉刷新
            isLoading 用来控制下拉刷新的 loading 状态
            下拉刷新的时候，它会自动将 loading 设置为 true
            @refresh 当下拉刷新的时候会触发
        -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!--
              列表组件：主要提供上拉加载更多的功能
              loading 用来控制加载中 loading 状态
              finished 用来控制是否加载完毕
              @load 加载更多的时候触发的一个事件，它自动会调用 onLoad 函数拿数据，以填充页面
                  它每次调用 onLoad 会自动将 loading 设置为 true
                  我们需要在 onLoad 中拿到本次加载的数据以后，将 loading 设置为 false
          -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    onLoad () {
      console.log('onLoad')
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    onRefresh () {
      console.log('onRefresh')
      setTimeout(() => {
        this.isLoading = false
      }, 3000)
    }
  }
}

</script>

<style lang="less" scoped>
.channel-tabs {
  margin-bottom: 100px;
}
// 不去scoped的做法
// 如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符：
// 有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名，同样可以正常工作。
// 深度作用选择器：https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}
.channel-tabs /deep/ .van-tabs__content {
  margin-top: 100px;
}
</style>
