import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type postPropsType = {
    id: number
    message: string
    likesCount: number
}

export type MyPostType = {
    posts: Array<postPropsType>
    addPostAC: () => void
    onChangeNewPostAC: (text: string) => void
    newChangePost: string
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {


    const addPostMessage = (FormData:FormDataType) => {
        props.addPostAC(FormData.addNewPost)
    }

    let postsElements = props.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)
    return (
        <div>
            <div className={s.postsBlock}>
                <h3>My post</h3>
                <div>
                    <AddNewMyPostRedux onSubmit={addPostMessage}/>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>

    )
}
type FormDataType = {
    addNewPost: string
 }

const AddNewMyPost = (props:InjectedFormProps<FormDataType>) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field  name='addNewPost' placeholder={'new post'} component={'textarea'}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}
 let AddNewMyPostRedux = reduxForm<FormDataType>({form: 'profileAddNewMyPost'})(AddNewMyPost)