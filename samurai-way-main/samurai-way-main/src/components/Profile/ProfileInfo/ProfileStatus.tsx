import React from "react";


export type ProfileStatusType = {
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false
    }

    activeEditModeHandler(){
        this.setState(
            {editMode: true}
        )
    }

    deActiveEditModeHandler(){
        this.setState(
            {editMode : false}
        )
    }


    render() {
        debugger
        return <div>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activeEditModeHandler.bind(this)} >{this.props.status}</span>
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input value={this.props.status} autoFocus onBlur={this.deActiveEditModeHandler.bind(this)}/>
                </div>
            }
        </div>
    }

}