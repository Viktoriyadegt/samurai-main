import React, {ComponentType} from "react";
import {sendMessageAC} from "../../redux/dialogs-reducer";
import {Dialogs, dialogsPageType} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirectComponent";


type MapStatePropsType = {
    dialogsPage: dialogsPageType

}
type MapDispatchPropsType = {
    sendMessageAC: (newMessageBody: string) => void
}

export type DialogsPropsType = MapDispatchPropsType & MapStatePropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {

    return {
        dialogsPage: state.dialogsPage,

    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessageAC: (newMessageBody: string) => {
            dispatch(sendMessageAC(newMessageBody))
        },
    }
}

export default compose<ComponentType>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirectComponent)(Dialogs)