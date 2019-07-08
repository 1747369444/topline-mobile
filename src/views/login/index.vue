<template>
  <div>
    <van-nav-bar title="登录" />
    <form>
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          clearable
          left-icon="phone-o"
          label="手机号"
          placeholder="请输入手机号"
        />
        <van-field
          v-model="user.code"
          type="password"
          label="密码"
          left-icon="label-o"
          placeholder="请输入密码"
        />
      </van-cell-group>
      <div class="login-btn">
        <van-button type="info" class="btn" @click="handleLogin">登录</van-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    handleLogin () { }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  padding: 10px;
  .btn {
    width: 100%;
  }
}
</style>
