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
        <!-- 表单中按钮有默认提交行为用.prevent修饰符阻止 -->
        <van-button type="info" class="btn" @click.prevent="handleLogin">登录</van-button>
      </div>
    </form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '15664441107',
        code: '123456'
      }
    }
  },
  methods: {
    async handleLogin () {
      try {
        const data = await login(this.user)
        // console.log(data)

        // 通过提交 mutation 更新 Vuex 容器中的装填
        this.$store.commit('setUser', data)
      } catch (err) {
        console.log(err)
        console.log('登录失败')
      }
    }
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
