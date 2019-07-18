<template>
  <van-dialog
    :value="value"
    @input="$emit('input', $event)"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <van-cell-group v-if="!isReportShow">
      <van-cell icon="location-o" title="不感兴趣" />
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isReportShow = true" />
      <van-cell icon="location-o" title="拉黑作者" />
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReportShow = false" />
      <van-cell icon="location-o" title="拉黑作者" />
      <van-cell icon="location-o" title="拉黑作者" />
      <van-cell icon="location-o" title="拉黑作者" />
      <van-cell icon="location-o" title="拉黑作者" />
      <van-cell icon="location-o" title="拉黑作者" />
      <van-cell icon="location-o" title="拉黑作者" />
      <van-cell icon="location-o" title="拉黑作者" />
      <van-cell icon="location-o" title="拉黑作者" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isReportShow: false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
