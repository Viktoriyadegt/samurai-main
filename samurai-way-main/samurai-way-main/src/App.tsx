import React, {ComponentType} from 'react';

import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {News} from './components/News/News';
import {Settings} from './components/Settings/Settings';
import {Music} from "./components/Musik/Musik";
import UsersContainer from './components/users/UsersContainer';
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Route, withRouter} from "react-router-dom";
import HeaderContainer, {MapStatePropsType} from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeAppTC} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/preloader/Preloader";


class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeAppTC()
    }


    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }
        debugger

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-components">

                    <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                    <Route path={'/dialogs/'} render={() => <DialogsContainer/>}/>
                    <Route path={"/news"} render={() => <News/>}/>
                    <Route path={"/music"} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                    <Route path={'/users'} render={() => <UsersContainer/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>

                </div>

            </div>
        )
    }
}

type MapStateToPropsType = {
    initialized: boolean
}

type MapDispatchPropsType = {
    initializeAppTC: () => void
}

export type AppPropsType = MapDispatchPropsType & MapStateToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialize,

    }
};


export default compose<ComponentType>(withRouter, connect(mapStateToProps, {initializeAppTC}))(App)
