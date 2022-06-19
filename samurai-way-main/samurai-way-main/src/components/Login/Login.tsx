import React from 'react';
import {Field, InjectedFormProps, reduxForm, submit} from "redux-form";
import {Input} from "../common/FormControls/formControls";
import {required} from "../../utils/FieldLevelValidationForm";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import style from "./../common/FormControls/formControls.module.css"


const Login = (props: LoginPropsType) => {
    const submit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth)
        return <Redirect to={`/profile/${props.userId}`}/>


    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={submit}/>
        </div>
    );
};

type MapStatePropsType = {
    isAuth: boolean
    userId:number
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

type LoginPropsType = MapDispatchPropsType & MapStatePropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        isAuth: state.auth.isAuth,
        userId:state.auth.id
    }
)


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

let LoginForm = (props: InjectedFormProps<FormDataType>) => {
    const {handleSubmit} = props
    return <form onSubmit={handleSubmit}>
        <div><Field placeholder={'email'} component={Input} name={'email'} validate={[required]}/></div>
        <div><Field type="password" placeholder={'password'} component={Input} name={'password'}
                    validate={[required]}/></div>
        <div><Field type="checkbox" component={Input} name={'rememberMe'} validate={[required]}/>remember me</div>
        {props.error&&<div className={style.formSummaryError}>{props.error}</div>}

        <button>Login</button>
    </form>
};


const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)


export default connect(mapStateToProps, {login})(Login);