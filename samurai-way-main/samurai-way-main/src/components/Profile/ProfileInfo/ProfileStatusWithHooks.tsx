import React, {ChangeEvent, useEffect, useState} from "react";

export type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusType) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

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