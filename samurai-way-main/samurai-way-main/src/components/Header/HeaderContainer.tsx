import React from "react";
import {Header} from "./Header";
import {getAuthData, InitialStateType, login, logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";


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
    logout: () => void
}

export type HeaderType = MapDispatchPropsType & MapStatePropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        auth: state.auth
    }
)

export default connect(mapStateToProps, {getAuthData, logout})
(HeaderContainer)