import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import {DialogsItem} from "./DialogsItem/DialogsItem";
import { Messages} from "./Messages/Messages";
import {DialogsPropsType} from "./DialogsContainer";
import {Redirect} from "react-router-dom";

type dialogPropsType = {
    id: number
    name: string
}
type messagePropsType = {
    id: number
    message: string
}
export type dialogsPageType = {
    dialogs: Array<dialogPropsType>
    messages: Array<messagePropsType>
    newMessageBody: string
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
const state = props.dialogsPage


    let dialogsElements = state.dialogs.map(d => <DialogsItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Messages key={m.id} id={m.id} message={m.message}/>)
    let newMessageBody = state.newMessageBody

    let onSendMessageOnClick = () => {
        props.sendMessageAC()
    }

    let onNewMessageChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        const body = e.currentTarget.value
        props.updateNewMessageBodyAC(body)
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div className={s.message}>
                    <div>{messagesElements}</div>
                    <div>
                        <div><textarea value={newMessageBody}
                                       onChange={onNewMessageChange}
                                       placeholder={'enter your message'}>

                        </textarea></div>
                      <div><button onClick={onSendMessageOnClick}>send</button></div>
                    </div>

                </div>

            </div>
        </div>
    )
}