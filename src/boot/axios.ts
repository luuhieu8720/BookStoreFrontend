/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment'
import axios from 'axios'

Date.prototype.toISOString = function () {
    return moment(this).format('YYYY-MM-DDTHH:mm:ss')
}

const baseDomain = ''
const baseURL = `${baseDomain}/api`

const api = axios.create({ baseURL })


const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?$/


function isIsoDateString (value: unknown): boolean {
    return (value && typeof value === 'string' && isoDateFormat.test(value)) === true
}

export function handleDates (body: any) {
    if (body === null || body === undefined || typeof body !== 'object') {
        return body
    }

    for (const key of Object.keys(body)) {
        const value = body[key]

        if (isIsoDateString(value)) {
            body[key] = moment(value).toDate()
        } else if (typeof value === 'object') handleDates(value)
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
const axiosInit = (store: any, toastService: any) => {
    api.interceptors.request.use((request) => {
        if (request !== null && request.url) {
            const state = store.state
            const token = state.token as string
            const isLogin = request.url.startsWith('/auths') && request.method === 'post'

            if (token && !isLogin) {
                request.headers.Authorization = `Bearer ${token}`
            } else {
                delete request.headers.Authorization
            }
        }

        return request
    })

    api.interceptors.response.use(
        (response) => {
            handleDates(response.data)
            return response
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any) => {
            if (error.response.status === 401) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const router = store.$router as Router
                void router.push('login')
            } else {
                if (error.response) {
                    const message = error.response.data || error.response.message
                    if (message) {
                        toastService.add({severity:'error', summary: 'Error', detail: message, life: 3000});
                    }
                }
            }
            return Promise.reject(error)
        }
    )
}

export { api, axiosInit }