<template>
  <div class="home">
    <van-nav-bar title="首页" fixed />
    <!-- activeChannelIndex 绑定当前激活的标签页，使用索引 -->
    <van-tabs class="channel-tabs" v-model="activeChannelIndex">
      <van-tab v-for="channelItem in channels" :key="channelItem.id" :title="channelItem.name">
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
          <van-list
            v-model="channelItem.upPullLoading"
            :finished="channelItem.upPullFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="articleItem in channelItem.articles"
              :key="articleItem.art_id"
              :title="articleItem.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
  name: 'HomeIndex',
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      channels: [] // 存储频道列表
    }
  },
  computed: {
    //  当前激活的频道
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { user } = this.$store.state
      let channels = []
      // 如果用户已登录
      if (user) {
        const data = await getUserChannels()
        console.log(data)
        channels = data.channels
      } else {
        // 没有登录
        // 如果有本地存储数据则使用本地存储中的频道列表
        const loadChannels = JSON.parse(window.localStorage.getItem('channels'))
        if (loadChannels) {
          channels = loadChannels
        } else {
          // 如果没有本地存储频道数据则请求获取默认推荐频道列表
          const data = await getUserChannels()
          channels = data.channels
        }
      }
      /**
       * 修改channels，将这个数据结构修改为满足我们使用的需求，
       * 因为每个个标签页数据都不同对应一分数据
       */
      channels.forEach(item => {
        item.articles = [] // 用来存储当前文章的列表
        item.timestamp = Date.now() // 存储下一页数据的时间戳（获取下一页数据）
        item.downPullLoading = false // 控制当前频道的下拉刷新 loading 状态
        item.upPullLoading = false // 控制当前频道的上拉加载更多的 loading 状态
        item.upPullFinished = false // 控制当前频道数据是否加载完毕
      })
      this.channels = channels
    },
    // 上拉加载更多，push数据
    async onLoad () {
      // console.log('onLoad')
      // 使用已封装的定时器控制加载
      await this.$sleep(800)

      let data = []
      data = await this.loadArticles()
      // 如果没有 pre_timestamp 并且数组是空的，则意味着没有数据了，没有新数据
      if (!data.pre_timestamp && !data.results.length) {
        // 设置该频道数据已记载完毕，组件会自动给出提示，并且不再加载
        this.activeChannel.upPullFinished = true
        // 取消 loading
        this.activeChannel.upPullLoading = false
        // 代码不要往后继续执行了
        return
      }

      // pre_timestamp 下一页的页码
      // results 文章列表
      // console.log(data)
      // 解决初始化的时候没有最新推荐数据的问题（没有最新数据，那就加载上一次推荐数据）
      if (data.pre_timestamp && !data.results.length) {
        // 获取下一页的时间戳
        this.activeChannel.timestamp = data.pre_timestamp
        // 加载下一页数据
        data = await this.loadArticles()
      }

      // 数据加载好以后，将 pre_timestamp 更新到当前频道的中用于加载下下页数据
      this.activeChannel.timestamp = data.pre_timestamp

      // 将文章数据更新到频道中（☆注意：是 push 追加，不是覆盖）
      this.activeChannel.articles.push(...data.results)

      // 数据加载完毕，取消上拉 loading
      this.activeChannel.upPullLoading = false
    },
    // 下拉刷新,如果有新数据，则重置列表数据
    onRefresh () {
      console.log('onRefresh')
      setTimeout(() => {
        this.isLoading = false
      }, 3000)
    },
    async loadArticles () {
      const { id: channelId, timestamp } = this.activeChannel
      const data = await getArticles({
        channelId, // 当前激活频道id
        timestamp, // 当前频道下一页数据的时间戳
        withTop: 1 // 是否包含置顶数据
      })
      return data
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
