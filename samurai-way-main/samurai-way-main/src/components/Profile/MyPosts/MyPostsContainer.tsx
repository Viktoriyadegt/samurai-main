
import {addPostAC, onChangeNewPostAC, PostPropsType} from "../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    posts:Array<PostPropsType>
    newChangePost:string
}
type MapDispatchPropsType = {
    addPostAC: ()=>void
    onChangeNewPostAC:(text:string)=>void
}

export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state:AppStateType): MapStatePropsType=> {
    return {
        posts: state.profilePage.posts,
        newChangePost: state.profilePage.newChangePost
    }
}

const mapDispatchToProps = (dispatch:Dispatch):MapDispatchPropsType => {
    return {
        addPostAC:()=>{
            dispatch(addPostAC())
        },
        onChangeNewPostAC:(text: string)=>{
            dispatch(onChangeNewPostAC(text))
        }
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)