import React from "react";
import s from './Header.module.css'

type HeaderPropsType = {}

export const Header: React.FC<HeaderPropsType> = (props) => {
    return(
    <header className={s.header}>
        <img src={"https://i.pinimg.com/736x/de/a0/f3/dea0f3b7f480b1151c08db4a402a43b9.jpg"}/>
    </header>
    )
}