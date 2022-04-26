import React from "react";
import s from "../Dialogs.module.css"

type messagePropsType = {
    id: number
    message: string
}


export const Messages: React.FC<messagePropsType> = (props) => {

debugger
    return <div className={s.message}>{props.message}</div>

}


