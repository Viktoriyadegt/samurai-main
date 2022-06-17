import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormControls/formControls";
import {required} from "../../utils/FieldLevelValidationForm";

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
        <div><Field placeholder={'login'} component={Input} name={'login'} validate={[required]}/></div>
        <div><Field placeholder={'password'} component={Input} name={'password'} validate={[required]}/></div>
        <div><Field type="checkbox" component={Input} name={'rememberMe'} validate={[required]}/>remember me</div>
        <button>Login</button>
    </form>
};


const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)


export default Login;