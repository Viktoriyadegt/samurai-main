import React from "react";
import s from "../../Dialogs/Dialogs.module.css"
import {NavLink} from "react-router-dom";


export type DialogsItemPropsType = {
    name: string
    id: number
}
export const DialogsItem: React.FC<DialogsItemPropsType> = (props) => {
    let mor = '/dialogs/' + props.id
    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={mor}>{props.name}</NavLink>
        </div>
    )
}

