import React, {ChangeEvent} from "react";

export type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

 class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activeEditModeHandler = () => {
        this.setState(
            {editMode: true}
        )
    }

    deActiveEditModeHandler = () => {
        this.setState(
            {editMode: false}
        )
        this.props.updateStatus(this.state.status)
    }


    onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {status: e.currentTarget.value}
        )
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>, snapshot?: any) {
        console.log('update')
        if (prevProps.status != this.props.status) {
            this.setState(
                {status: this.props.status}
            )
        }
    }

    render() {
        return <div>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activeEditModeHandler}>{this.props.status}</span>
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input value={this.state.status} onChange={this.onChangeStatusHandler} autoFocus
                           onBlur={this.deActiveEditModeHandler}/>
                </div>
            }
        </div>
    }

}