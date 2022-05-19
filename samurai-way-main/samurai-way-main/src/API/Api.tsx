import axios from "axios";
import {UsersPropsType} from "../redux/users-reducer";
import {HeaderPropsType} from "../components/Header/HeaderContainer";
import {ProfilePropsType} from "../redux/profile-reducer";

type ResponseType = {
    items: Array<UsersPropsType>
    totalCount: number
    error: string
    resultCode: number
}

const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY": "11bc4102-72ab-40e1-a76b-b87af6c4cd4f"
        }
    }
)


export const userAPI = {
    getUser(users: Array<UsersPropsType> | number, pageSize: number) {
        return instance.get<ResponseType>(`users?page=${users}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    header() {
        return instance.get<HeaderPropsType>(`auth/me`)
            .then(response => response.data)
    },
    profile(userId:number) {
        return instance.get<ProfilePropsType>(`profile/` + userId)
            .then(response => response.data)
    },
}
