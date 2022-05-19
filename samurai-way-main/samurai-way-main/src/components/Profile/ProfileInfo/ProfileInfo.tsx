import React from "react";
import s from './ProfileInfo.module.css'
import {ProfilePropsType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader/Preloader";
import img from "./../../../images/images.png"

type ProfileInfoPropsType = {
    profile: ProfilePropsType | null
}
export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

    {
        if (!props.profile)
            return <Preloader/>
    }
    debugger
    return <div>
        <div>
            <img
                src={"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"}/>
        </div>
        <div className={s.descriptionBlock}>
            <div >
                <img src={props.profile.photos.small !== null ? props.profile.photos.small : img}/>
                <div className={s.name}>{props.profile.fullName}</div>
            </div>
            <div>Contacts:</div>
          <ul>
                <li ><span>facebook:</span><a>{props.profile.contacts.facebook}</a></li>
                <li><span>website:</span><a>{props.profile.contacts.website}</a></li>
                <li><span>vk:</span><a>{props.profile.contacts.vk}</a></li>
                <li><span>github:</span><a>{props.profile.contacts.github}</a></li>
                <li><span>twitter:</span><a>{props.profile.contacts.twitter}</a></li>
                <li><span>instagram:</span><a>{props.profile.contacts.instagram}</a></li>
                <li><span>youtube:</span><a>{props.profile.contacts.youtube}</a></li>
                <li><span>mainLink:</span><a>{props.profile.contacts.mainLink}</a></li>
        </ul>

        </div>
        <div>Status:{props.profile.lookingForAJobDescription}</div>
    </div>
}
