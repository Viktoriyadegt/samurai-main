import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";

import {InitialStateType1, ProfilePropsType, setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {userAPI} from "../../API/Api";



class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        //let userID:number | null = this.props.router.params.userID;
        let userId = Number(this.props.match.params.userId);
        if(!userId) {
            return (
                userId = 2
            )

        }
            userAPI.profile(userId).then(data => {
                this.props.setUserProfile(data);
            })
    }

    render() {

        return (
                <Profile {...this.props} profile={this.props.profilePage.profile}/>
        )
    }
}




type PropsType =  RouteComponentProps<PathParamsType> & MapStateToPropsType & MapDispatchToPropsType

type PathParamsType = {
    userId: string
}
type MapDispatchToPropsType = {
    setUserProfile: (profile:ProfilePropsType)=>void
}
type MapStateToPropsType = {
    profilePage: InitialStateType1
}

let mapStateToProps = (state:AppStateType):MapStateToPropsType =>( {
    profilePage: state.profilePage
})



let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps,{setUserProfile})(WithUrlDataContainerComponent);
//export default connect(mapStateToProps,{setUserProfile})(ProfileContainer);

