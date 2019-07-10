<template>
  <div>
    <p>测试页面</p>
    <!--
      vee-validate 表单验证插件使用规则
      1. 使用 v-validate 是 vee-validate 提供的一个全局指令，用来给表单元素设置校验规则的
      2. 为元素设置 name 属性
      3. 可以使用 errors.first('字段的name') 来获取该字段验证失败的错误消息
        errors 是验证插件给你全局注入的
    -->
    <!-- <input v-validate="'required|email'" name="email" type="text" />
    <span>{{ errors.first('email') }}</span>-->
    <van-cell-group>
      <!--
        VantUI中错误文本提示规则
        1. 使用 v-validate 添加校验规则
        2. 为元素设置 name 属性
        3. 将错误消息配置到组件的 error-message 属性上
      -->
      <van-field
        v-model="username"
        v-validate="'required'"
        placeholder="请输入用户名"
        name="username"
        type="password"
        :error-message="errors.first('username')"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'Testindex',
  data () {
    return {
      username: ''
    }
  }

}
</script>

<style scoped>
</style>
