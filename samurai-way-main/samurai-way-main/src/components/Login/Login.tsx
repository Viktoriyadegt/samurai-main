import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormControls/formControls";
import {required} from "../../utils/FieldLevelValidationForm";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";


const Login = (props: LoginPropsType) => {
    const submit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={submit}/>
        </div>
    );
};

type MapStatePropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

type LoginPropsType = MapDispatchPropsType & MapStatePropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        isAuth: state.auth.isAuth
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
        <button>Login</button>
    </form>
};


const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)


export default connect(mapStateToProps, {login})(Login);