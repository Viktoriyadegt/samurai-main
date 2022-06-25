import React, {ChangeEvent, ChangeEventHandler, useState} from "react";

export type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusType) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activeEditModeHandler = () => {
        setEditMode(true)
    }

    const deActiveEditModeHandler = () => {
        setEditMode(false)
        props.updateStatus(status)
    }


    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    // componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>, snapshot?: any) {
    //     console.log('update')
    //     if (prevProps.status != this.props.status) {
    //         this.setState(
    //             {status: this.props.status}
    //         )
    //     }
    // }

    return <div>
        {!editMode &&
            <div>
                <span onDoubleClick={activeEditModeHandler}>{status}</span>
            </div>
        }
        {editMode &&
            <div>
                <input value={status} onChange={onChangeStatusHandler} autoFocus
                       onBlur={deActiveEditModeHandler}/>
            </div>
        }
    </div>

}