<template>
  <Toast />
  <TopAppBarComponent />
  <router-view/>
</template>

<script lang="ts">
import TopAppBarComponent from "@/components/TopAppBarComponent.vue";
import {onMounted} from "vue";
import {axiosInit} from "@/boot/axios";
import store from "@/store";
import {useToast} from "primevue/usetoast";
import Toast from "primevue/toast";
import {useAuths} from "@/logics/auths.logic";
export default {
  components: {
    TopAppBarComponent,
    Toast
  },
  setup(){
    onMounted(() => {
      axiosInit(store, useToast());
      const {getCurrentUser} = useAuths();
      if(store.state.token) {
        getCurrentUser();
      }
    })
  }
}
</script>

<style lang="scss">

</style>
