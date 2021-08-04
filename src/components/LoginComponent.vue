<template>
  <div class="p-fluid">
    <div class="field grid">
      <label class="col-4">Tên đăng nhập</label>
      <div class="col-8">
        <InputText v-model="loginForm.username"/>
      </div>
    </div>
    <div class="field grid">
      <label class="col-4">Mật khẩu</label>
      <div class="col-8">
        <Password v-model="loginForm.password" :feedback="false"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import LoginModel from "@/models/user/login.model";

export default defineComponent({
  props:{
    loginForm: {
      type: Object as PropType<LoginModel>,
      required: true
    },
  }
})
</script>