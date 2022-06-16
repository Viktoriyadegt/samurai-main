import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsType => ({isAuth: state.auth.isAuth})

export function withAuthRedirectComponent<T>(Component: ComponentType<T>) {
debugger
    const RedirectComponent = (props: MapStateToPropsType) => {
debugger
        let {isAuth, ...restProps} = props;
        if (!isAuth) return <Redirect to={'/login'}/>
        debugger
        return <Component {...restProps as T}/>;
    }

    let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectAuthRedirectComponent
}