import React from "react";

import {sendMessageAC, updateNewMessageBodyAC} from "../redux/dialogs-reducer";
import {Dialogs, dialogsPageType} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {Dispatch} from "redux";


type MapStatePropsType = {
    dialogsPage: dialogsPageType
}
type MapDispatchPropsType = {
    sendMessageAC : ()=>void
    updateNewMessageBodyAC: (body:string)=>void

}

export type DialogsPropsType = MapDispatchPropsType & MapStatePropsType

const mapStateToProps = (state:AppStateType):MapStatePropsType => {
debugger
    return {
        dialogsPage: state.dialogsPage

    }
}

const mapDispatchToProps = (dispatch:Dispatch):MapDispatchPropsType => {
    return {
        sendMessageAC:()=>{
            dispatch(sendMessageAC())
        },
        updateNewMessageBodyAC:(body:string)=>{
            dispatch(updateNewMessageBodyAC(body))
        }
    }
}
export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)