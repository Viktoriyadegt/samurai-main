import React from "react";
import axios from "axios";
import {Header} from "./Header";
import {DataType, InitialStateType, setAuthDataAC} from "../redux/auth-reducer";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type ResponseType = {
    id: number
    email: string
    login: string
    resultCode: number
    messages: string

}

class HeaderContainer extends React.Component<HeaderType> {
    componentDidMount() {

        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                debugger
                if (response.data.resultCode === null) {
                    let {id, email, login} = response.data
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