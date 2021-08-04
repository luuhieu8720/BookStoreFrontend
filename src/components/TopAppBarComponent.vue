<template>
  <Menubar :model="items">
    <template #end>
      <div v-if="currentUser">
        Chào <strong>{{currentUser.name}}.</strong>
        <a class="ml-2" href="#" @click="doLogout()">Đăng xuất</a>
      </div>
      <Button v-else label="Đăng nhập" icon="pi pi-sign-in" class="p-button-sm" @click="showLogin=true" />
    </template>
  </Menubar>

  <Dialog header="Đăng nhập" v-model:visible="showLogin" :modal="true" :style="{width: '30vw'}">
    <LoginComponent :login-form="loginForm" />
    <template #footer>
      <div class="d-flex jc-between">
        <Button label="Bỏ qua" icon="pi pi-times" @click="showLogin=false" class="p-button-danger"/>
        <Button :disabled="!loginValid(loginForm)" :loading="isLoading" label="Đăng nhập" icon="pi pi-check" @click="doLogin()" class="p-button-primary" />
      </div>
    </template>
  </Dialog>
</template>


<script lang="ts">
import Menubar from 'primevue/menubar';

import {ref} from "vue";
import { defineComponent } from 'vue';
import {useAuths} from "@/logics/auths.logic";
import LoginModel from "@/models/user/login.model";
import LoginComponent from "@/components/LoginComponent.vue";
import useNotification from "@/logics/notification.logic";
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
  components: {
    LoginComponent,
    Menubar
  },
  setup(){
    const showLogin = ref(false)
    const loginForm = ref({} as LoginModel);
    const isLoading = ref(false);
    const notification = useNotification();
    const router = useRouter();

    const {login, currentUser, loginValid, logout} = useAuths()

    const items = ref([
      {
        label:'Sách',
        icon:'pi pi-book',
      },
      {
        label:'Quản lý',
        icon:'pi pi-cog',
        items: [
          {
            label: "Thể loại",
            icon: 'pi pi-tags',
            to: {name: 'CatalogsPage'}
          },
          {
            label: "Tác giả",
            icon: 'pi pi-id-card',
            to: {name: 'AuthorsPage'}
          },
          {
            label: 'Người dùng',
            icon: 'pi pi-users',
            to: {name: 'UsersPage'}
          }
        ]
      }
    ]);
    const doLogin = () => {
      isLoading.value = true;
      login(loginForm.value)
      .then(() => {
        notification.showMessage('Bạn đã đăng nhập thành công');
        showLogin.value = false;
      }).finally(()  => {
        isLoading.value = false;
      })
    }

    const doLogout = () => {
      logout();
      router.push({name: 'BooksPage'})
      notification.showMessage('Bạn đã đăng xuất thành công');
    }

    return {
      showLogin,
      doLogin,
      loginForm,
      items,
      currentUser,
      loginValid,
      doLogout,
      isLoading
    }
  }
})
</script>