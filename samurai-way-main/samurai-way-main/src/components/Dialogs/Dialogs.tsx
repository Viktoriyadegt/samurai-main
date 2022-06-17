import React from "react";
import s from "./Dialogs.module.css"
import {DialogsItem} from "./DialogsItem/DialogsItem";
import {Messages} from "./Messages/Messages";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormControls/formControls";
import {maxLengthCreator, required} from "../../utils/FieldLevelValidationForm";

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
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const state = props.dialogsPage


    let dialogsElements = state.dialogs.map(d => <DialogsItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Messages key={m.id} id={m.id} message={m.message}/>)

    let addMessage = (formData: FormDataType) => {
        props.sendMessageAC(formData.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div className={s.message}>
                    <div>{messagesElements}</div>
                    <AddNewMessageRedux onSubmit={addMessage}/>

                </div>

            </div>
        </div>
    )
}

export type FormDataType = {
    newMessageBody:string
}

const maxlength50 = maxLengthCreator(50)

const AddNewMessage = (props: InjectedFormProps<FormDataType>) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
        <Field component={Textarea} name={'newMessageBody'} validate={[required, maxlength50]}
               placeholder={'enter your message'}/>
        </div>
        <div>
            <button>send</button>
        </div>
    </form>
}

const AddNewMessageRedux= reduxForm<FormDataType>({form:'dialogAddNewMessage'})(AddNewMessage)