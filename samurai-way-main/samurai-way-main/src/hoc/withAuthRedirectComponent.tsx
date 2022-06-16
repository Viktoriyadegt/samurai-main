import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsType => {
    return {isAuth: state.auth.isAuth}
}


export function withAuthRedirectComponent<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStateToPropsType) => {
        let {isAuth, ...restProps} = props;
        if (!isAuth) return <Redirect to={'login'}/>
        return <Component {...restProps as T}/>;
    }

    let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectAuthRedirectComponent
}