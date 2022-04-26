import React from "react";
import s from './Navbar.module.css';
import {NavLinkItem} from "./NavLinkItem/NavLinkItem";

export type NavbarPropsType = {
}
export const Navbar :React.FC<NavbarPropsType> = () => {

    return (
        <nav className={s.nav}>
                <NavLinkItem title="Profile" link={'profile'}/>
                <NavLinkItem title="Messages" link={'dialogs'}/>
                <NavLinkItem title="Users" link={'users'}/>
                <NavLinkItem title="News" link={'news'}/>
                <NavLinkItem title="Music" link={'music'}/>
                <NavLinkItem title="Settings" link={'settings'}/>


        </nav>
    )
}