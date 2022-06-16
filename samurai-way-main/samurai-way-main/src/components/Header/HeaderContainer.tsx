import React from "react";
import axios from "axios";
import {Header} from "./Header";
import {DataType, getAuthData, InitialStateType, setAuthDataAC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {authAPI, userAPI} from "../../API/Api";

export type HeaderPropsType = {
    data:{
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: string

}

class HeaderContainer extends React.Component<HeaderType> {
    componentDidMount() {
        this.props.getAuthData()
    }

    render() {
        return (
            <>
                <Header  {...this.props}/>
            </>
        )
    }

}

export type MapStatePropsType = {
    auth: InitialStateType
}
type MapDispatchPropsType = {
    getAuthData: () => void

}

export type HeaderType = MapDispatchPropsType & MapStatePropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        auth: state.auth
    }
)

export default connect(mapStateToProps, {  getAuthData})
(HeaderContainer)