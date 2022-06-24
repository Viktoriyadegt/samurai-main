import axios from "axios";
import {UsersPropsType} from "../redux/users-reducer";
import {ProfilePropsType} from "../redux/profile-reducer";

type ResponseType = {
    items: Array<UsersPropsType>
    totalCount: number
    error: string
    resultCode: number
}

export type DataType = {
    id: number
    email: string
    login: string
}

export type DataTypeLogin = {
    userId: number
}

type ResponseDataType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY": "ac198f3b-fee8-4f25-9d00-a19d181ebcc6"
        }
    }
)


export const userAPI = {
    getUser(currentPage: number, pageSize: number) {
        return instance.get<ResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    profile(userId: number) {
        return instance.get<ProfilePropsType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateUserStatus(status: string) {
        return instance.put<ResponseDataType>(`profile/status`, {status})
            .then(response => response.data)
    }
}


export const authAPI = {
    me() {
        return instance.get<ResponseDataType<DataType>>(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseDataType<DataTypeLogin>>(`auth/login`, {email, password, rememberMe})
            .then(response => {
                return response.data
            })
    },
    logout() {
        return instance.delete<ResponseDataType<DataTypeLogin>>(`auth/login`,)
            .then(response => {
                return response.data
            })
    }

}
