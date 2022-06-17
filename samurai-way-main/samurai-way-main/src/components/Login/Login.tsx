import React from 'react';
import {DecoratedComponentClass, DecoratedFormProps, Field, reduxForm} from "redux-form";

const Login = (values:any) => {
    const submit = (values: any) => {
        // print the form values to the console
        console.log(values)
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={submit}/>
        </div>
    );
};




let LoginForm: any = (props:any) => {
    const {handleSubmit} = props
    return <form onSubmit={handleSubmit}>
        <div><Field placeholder={'login'} component={'input'} name={'login'}/></div>
        <div><Field placeholder={'password'}  component={'input'} name={'password'}/></div>
        <div><Field type="checkbox"  component={'input'} name={'rememberMe'}/>remember me</div>
        <button>Login</button>
    </form>
};



const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)


export default Login;