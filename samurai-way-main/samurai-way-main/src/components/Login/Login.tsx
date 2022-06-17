import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const Login = () => {
    const submit = (formData: FormDataType) => {
        console.log(formData)
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={submit}/>
        </div>
    );
};


let LoginForm = (props: InjectedFormProps<FormDataType>) => {
    const {handleSubmit} = props
    return <form onSubmit={handleSubmit}>
        <div><Field placeholder={'login'} component={'input'} name={'login'}/></div>
        <div><Field placeholder={'password'} component={'input'} name={'password'}/></div>
        <div><Field type="checkbox" component={'input'} name={'rememberMe'}/>remember me</div>
        <button>Login</button>
    </form>
};


const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)


export default Login;