
import {addPostAC, PostPropsType} from "../../../redux/profile-reducer";
import { MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../../redux/redux-store";

type MapStatePropsType = {
    posts:Array<PostPropsType>
}
type MapDispatchPropsType = {
    addPostAC: (addNewPost: string)=>void
}

export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state:AppStateType): MapStatePropsType=> {
    return {
        posts: state.profilePage.posts
    }
}

const mapDispatchToProps = (dispatch:Dispatch):MapDispatchPropsType => {
    return {
        addPostAC:(addNewPost)=>{
            dispatch(addPostAC(addNewPost))
        }
    }
}
export const MyPostsContainer = connect(mapStateToProps, {addPostAC})(MyPosts)