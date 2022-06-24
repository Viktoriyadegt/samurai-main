import React from "react";
import {Header} from "./Header";
import {getAuthData, InitialStateType, logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";


class HeaderContainer extends React.Component<HeaderType> {

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
    logout: () => void
}

export type HeaderType = MapDispatchPropsType & MapStatePropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        auth: state.auth
    }
)

export default connect(mapStateToProps, {logout})
(HeaderContainer)