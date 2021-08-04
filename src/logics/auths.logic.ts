import AuthsService from '@/services/auths.service'
import {useStore} from "vuex";
import LoginModel from "@/models/user/login.model";
import {CLEAR_TOKEN, SET_TOKEN, SET_USER} from "@/store";
import {computed} from "vue";
import {UserDetail} from "@/models/user/user.detail";

export function useAuths() {
    const store = useStore()
    const currentUser = computed(() => store.state.user as UserDetail| null)

    const getCurrentUser = () => {
        AuthsService.getUser().then(response => {
            store.commit(SET_USER, response.data)
        });
    }

    const login = (form: LoginModel) => {
        return AuthsService.auth(form)
            .then(response => {
                store.commit(SET_TOKEN, response.data.token)
                getCurrentUser()
            })
    }

    const loginValid = (form: LoginModel) => {
      return  form.username && form.password;
    }

    const logout = () => {
        store.commit(CLEAR_TOKEN);
        store.commit(SET_USER, null);
    }

    return {
        login,
        getCurrentUser,
        currentUser,
        loginValid,
        logout
    }
}