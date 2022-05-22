import styles from "./Users.module.css";
import {UsersPropsType} from "../../redux/users-reducer";
import userPhoto from '../../images/images.png'
import React from "react";
import {NavLink} from "react-router-dom";
import {followAPI} from "../../API/Api";


type UserPropsType = {
    users: Array<UsersPropsType>;
    followAC: (userId: number) => void
    unfollowAC: (userId: number) => void
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    followingIsProgressAC: (isFetching: boolean,userId:number)=>void
    followingIsProgress:number []
}

export function Users(props: UserPropsType) {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map((m, index) => <span key={index} className={props.currentPage === m ? styles.selectedPage : ''}
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
                            ? <button disabled={props.followingIsProgress.some(s=>s === m.id)} onClick={() => {props.followingIsProgressAC(true, m.id)
                                followAPI.unfollow(m.id).then(data => {
                                if (data.resultCode === 0) {
                                props.unfollowAC(m.id)
                                    props.followingIsProgressAC(false, m.id)
                            }
                            })
                            }}>Unfollow</button>
                            : <button disabled={props.followingIsProgress.some(s=>s === m.id)}onClick={() => {
                                props.followingIsProgressAC(true, m.id)
                                followAPI.follow(m.id).then(data => {
                                    if (data.resultCode === 0) {
                                        props.followAC(m.id)
                                    }
                                    props.followingIsProgressAC(false, m.id)
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