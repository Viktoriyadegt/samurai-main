import React from "react";
import axios from "axios";
import {Header} from "./Header";
import {DataType, InitialStateType, setAuthDataAC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {userAPI} from "../../API/Api";

export type HeaderPropsType = {
    id: number
    email: string
    login: string
    resultCode: number
    messages: string

}

class HeaderContainer extends React.Component<HeaderType> {
    componentDidMount() {
            userAPI.header().then(data => {
                if (data.resultCode === null) {
                    let {id, email, login} = data
                    this.props.setAuthDataAC(id, email, login)
                }

            })
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
    setAuthDataAC: (d: number, email: string, login: string) => void

}

export type HeaderType = MapDispatchPropsType & MapStatePropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        auth: state.auth
    }
)

export default connect(mapStateToProps, {setAuthDataAC})
(HeaderContainer)