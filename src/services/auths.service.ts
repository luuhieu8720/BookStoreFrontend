import { AxiosResponse } from 'axios'
import {api} from "@/boot/axios";
import TokenModel from "@/models/user/token.model";
import LoginModel from "@/models/user/login.model";
import {UserDetail} from "@/models/user/user.detail";

export default new class {
    private readonly resource = 'auths';

    auth (login: LoginModel): Promise<AxiosResponse<TokenModel>> {
        return api.post<TokenModel>(this.resource, login)
    }

    getUser (): Promise<AxiosResponse<UserDetail>> {
        return api.get<UserDetail>(this.resource)
    }
}()
