import React from 'react';

import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";

import {News} from './components/News/News';
import {Settings} from './components/Settings/Settings';
import {Music} from "./components/Musik/Musik";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainer from './components/users/UsersContainer';
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Route} from "react-router-dom";






export type StatePropsType = {
    //store: ReduxStoreType

}

const App: React.FC<StatePropsType> = (props) => {
debugger
    return (

        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-components">


                    <Route path={'/profile/:userId?'} render={()=><ProfileContainer />}/>
                    <Route path={'/dialogs/'} render={()=><DialogsContainer/>}/>
                    <Route path={"/news"} render={()=><News/>}/>
                    <Route path={"/music"} render={()=><Music/>}/>
                    <Route path={'/settings'} render={()=><Settings/>}/>
                    <Route path={'/users'} render={()=><UsersContainer/>}/>

            </div>

        </div>
    )
}


export default App;
