import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";

type postPropsType = {
    id: number
    message: string
    likesCount: number
}

export type MyPostType = {
    posts:Array<postPropsType>
    addPostAC: () => void
    onChangeNewPostAC: (text:string)=>void
    newChangePost: string
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {


    const addPostMessage = () => {
        props.addPostAC()
    }
    const onChangeNewTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.onChangeNewPostAC (text)
    }


    let postsElements = props.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)
    return (
        <div>
            <div className={s.postsBlock}>
                <h3>My post</h3>
                <div>
                    <div>
                        <textarea value={props.newChangePost} onChange={onChangeNewTextHandler}/>
                    </div>
                    <div>
                        <button onClick={addPostMessage}>Add post</button>
                    </div>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>

    )
}