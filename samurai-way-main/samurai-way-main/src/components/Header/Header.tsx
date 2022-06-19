import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {InitialStateType} from "../../redux/auth-reducer";

type HeaderPropsType = {
    auth: InitialStateType
    logout: () => void
}

export const Header: React.FC<HeaderPropsType> = (props) => {
    debugger
    return (
        <header className={s.header}>
            <img src={"https://i.pinimg.com/736x/de/a0/f3/dea0f3b7f480b1151c08db4a402a43b9.jpg"}/>
            <div className={s.authBlock}>

                {props.auth.isAuth
                    ? <div>{props.auth.login} --- <button onClick={props.logout}>logout</button></div>
                    : <NavLink to={'/login/'}>LOGIN</NavLink>}
            </div>
        </header>
    )
}