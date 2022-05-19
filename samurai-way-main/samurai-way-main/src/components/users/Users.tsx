import styles from "./Users.module.css";
import {UsersPropsType} from "../redux/users-reducer";
import userPhoto from '../../images/images.png'
import React from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";


type UserPropsType = {
    users: Array<UsersPropsType>;
    followAC: (userId: number) => void
    unfollowAC: (userId: number) => void
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
}

export function Users(props: UserPropsType) {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    debugger
    return <div>
        <div>
            {pages.map((m) => <span className={props.currentPage === m ? styles.selectedPage : ''}
                                    onClick={() => props.onPageChanged(m)}>{m}</span>)}
        </div>
        {props.users.map(m => <div key={m.id}>
                <span>
                    <div>
                        <NavLink to={`/profile/` + m.id}>
                        <img src={m.photos.small !== null ? m.photos.small : userPhoto} className={styles.photo}/>
                            </NavLink>
                    </div>
                    <div>{
                        m.followed
                            ? <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${m.id}`, {
                                    withCredentials: true,
                                    headers:{
                                        "API-KEY": "11bc4102-72ab-40e1-a76b-b87af6c4cd4f"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollowAC(m.id)
                                        }
                                    })
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${m.id}`, {}, {
                                    withCredentials: true,
                                    headers:{
                                        "API-KEY": "11bc4102-72ab-40e1-a76b-b87af6c4cd4f"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.followAC(m.id)
                                        }
                                    })
                            }}>Follow</button>
                    }</div>
                </span>
            <span>
                    <span>
                        <div>{m.name}</div>
                        <div>{m.status}</div>
                    </span>
                    <span>
                        <div>{'m.location.country'}</div>
                        <div>{'m.location.city'}</div>
                    </span>
                </span>
        </div>)}
    </div>
}

export default Users;