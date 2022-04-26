import React from "react";
import s from '../Navbar.module.css';
import {NavLink} from "react-router-dom";


type NavLinkItemPropsType={
    title: string
    link:string
}
export const NavLinkItem:React.FC<NavLinkItemPropsType>=(props)=> {
    let itemPath = props.link;
    return (
        <div className={s.item}>
            <NavLink className={isActive => `${s.item} ${isActive ? s.active : ""}`}
                     to ={`/${itemPath}`}>{props.title}</NavLink>
        </div>
    )
}

