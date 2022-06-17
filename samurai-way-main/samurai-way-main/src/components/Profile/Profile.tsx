import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfilePropsType} from "../../redux/profile-reducer";

type ProfileProps = {
    profile: ProfilePropsType | null
    status: string
    updateStatus: (status: string) => void
}

export const Profile: React.FC<ProfileProps> = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>

        </div>
    )
}