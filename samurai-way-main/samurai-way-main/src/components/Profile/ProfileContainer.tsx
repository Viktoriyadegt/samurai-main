import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, InitialStateType1, ProfilePropsType, setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";


class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        //let userID:number | null = this.props.router.params.userID;
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
    setUserProfile: (profile: ProfilePropsType) => void
    getUserProfile: (userId: number) => void
}
type MapStateToPropsType = {
    profilePage: InitialStateType1
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profilePage: state.profilePage
})


let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps,{setUserProfile,getUserProfile})(WithUrlDataContainerComponent);
//export default connect(mapStateToProps,{setUserProfile})(ProfileContainer);

