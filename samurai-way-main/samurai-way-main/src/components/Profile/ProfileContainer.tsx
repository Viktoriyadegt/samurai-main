import React, {ComponentType} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, InitialStateType1, setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import { RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {

        let userId = Number(this.props.match.params.userId);
        if (!userId) {
            return (
                userId = 2
            )
        }
        this.props.getUserProfile(userId)
    }

    render() {



        return (
            <Profile {...this.props} profile={this.props.profilePage.profile}/>
        )
    }
}




type PropsType = RouteComponentProps<PathParamsType> & MapStateToPropsType & MapDispatchToPropsType

type PathParamsType = {
    userId: string
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
}
type MapStateToPropsType = {
    profilePage: InitialStateType1
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profilePage: state.profilePage
})

export default compose<ComponentType>(
    connect(mapStateToProps, {setUserProfile, getUserProfile}),
    withRouter)(ProfileContainer)



