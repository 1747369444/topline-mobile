<template>
  <van-popup
    :style="{ height: '95%' }"
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    get-container="body"
    :lazy-render="false"
  >
    <!-- 我的频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button type="danger" plain size="mini" @click="isEdit=!isEdit">{{isEdit ? '完成':'编辑'}}</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="(item,index) in userChannels"
          :key="item.id"
          @click="handleUserChannelClick(item, index)"
        >
          <span class="text" :class="{ active : index===activeIndex&&!isEdit}">{{item.name}}</span>
          <!-- 删除icon -->
          <van-icon
            class="close-icon"
            v-show="isEdit && !aliveChannels.includes(item.name)"
            name="close"
          />
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          @click="handleAddChannel(item)"
        >
          <div class="info">
            <span class="text">{{item.name}}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels,
  deleteUserChannel,
  resetUserChannels } from '@/api/channel'
import { mapState } from 'vuex'
export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userChannels: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道列表
      isEdit: false, // 是否是编辑状态
      aliveChannels: ['推荐']
    }
  },
  computed: {
    // 计算属性会监视内部依赖的实例中的成员，当数据发生改变，他会重新调用计算
    // 过滤出不包含用户频道的列表数据
    recommendChannels () {
      // 从用户频道中映射一个数组，数组中存储了所有的用户频道id
      const duplicates = this.userChannels.map(item => item.id)
      // this.allChannels.filter(item =>不属于用户频道的item)
      return this.allChannels.filter(item => !duplicates.includes(item.id))
    },
    // Vuex的辅助方法，映射user，用来将state中的数据映射到本地计算属性
    // 每次都this.$store.state太麻烦，user=this.$store.state.user
    ...mapState(['user'])
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const data = await getAllChannels()
      // console.log(data)
      // 保持数据结构统一
      data.channels.forEach(item => {
        item.articles = [] // 用来存储当前文章的列表
        item.timestamp = Date.now() // 存储下一页数据的时间戳（获取下一页数据）
        item.downPullLoading = false // 控制当前频道的下拉刷新 loading 状态
        item.upPullLoading = false // 控制当前频道的上拉加载更多的 loading 状态
        item.upPullFinished = false // 控制当前频道数据是否加载完毕
      })

      this.allChannels = data.channels
    },
    // 添加频道
    async handleAddChannel (item) {
      // 将点击的频道添加到我的频道
      this.userChannels.push(item)

      // 持久化
      if (this.user) {
        // 如果用户已登录，则将数据请求添加到后端
        const data = this.userChannels.slice(1).map((item, index) => {
          return {
            id: item.id, // 频道id
            sep: index + 2
          }
        })
        await resetUserChannels(data)
        return
      }
      // 如果未登录，则将数据持久化到本地存储
      window.localStorage.setItem('channels', JSON.stringify(this.userChannels))
    },
    // 非编辑状态处理
    changeChannel (item, index) {
      // console.log('编辑')
      this.$emit('update:active-index', index)
      this.$emit('input', false)
    },
    // 编辑状态删除
    async deleteChannel (item, index) {
      this.userChannels.splice(index, 1)
      // 手动的设置一下当前激活的标签索引
      // 用来触发onload调用，否则可能看不到那个数据
      // 判断当前激活频道中是否有数据，如果没有手动的onload一下

      if (this.user) {
        // 已登录，发请求删除
        await deleteUserChannel(item.id)
      } else {
        // 未登录，删除本地存储数据
        window.localStorage.setItem('channels', JSON.stringify(this.userChannels))
      }
    },
    // 我的频道状态删除
    handleUserChannelClick (item, index) {
      // 非编辑状态：切换频道
      if (!this.isEdit) {
        this.changeChannel(item, index)
      } else {
        // 编辑状态：删除频道
        !this.aliveChannels.includes(item.name) && this.deleteChannel(item, index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 20px;
    }
    .action {
    }
  }
  .channel-content {
    .text {
      font-size: 22px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 30px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
