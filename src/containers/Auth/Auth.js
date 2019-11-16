import React, {Component} from 'react'
import classes from './Auth.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import http from '../../form/http'

export default class Auth extends Component{
    state={
        isFormValid:false,
        formControls:{
            email: {
                value: '',
                type:'email',
                label:'Email',
                errorMessage: 'Введите корректный email',
                valid: false, //сосотояние валидации
                touched:false, //был ли затронут
                validation:{
                    required: true,
                    email: true
                }
            },
            password:{
                value: '',
                type:'password',
                label:'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false, //сосотояние валидации
                touched:false, //был ли затронут
                validation:{
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler=() => {
        console.log('email ', this.state.formControls.email.value, 'pass = ', this.state.formControls.password.value)
        http('signin', 'POST', {
            login: this.state.formControls.email.value,
            password:this.state.formControls.password.value
        }).then()
            .catch()
    }

    registerHandler=()=>{
        console.log('email ', this.state.formControls.email.value, 'pass = ', this.state.formControls.password.value)
        http('signup', 'POST', {
            login: this.state.formControls.email.value,
            password:this.state.formControls.password.value
        }).then()
            .catch()

    }
    submitHandler =event =>{
        event.preventDefault()
    }

    validateControl(value, validation){
        if (!validation){
            return true
        }
        let isValid = true
        if (validation.required){
            isValid =  value.trim() !== '' && isValid
        }
        if (validation.email){
            isValid=is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }

    onChangeHandler =(event, controlName) =>{

        const formControls = { ...this.state.formControls} //копия
        const control = { ...formControls[controlName]} //копия
        control.value = event.target.value
        control.touched = true
        control.valid=this.validateControl(control.value, control.validation)

        formControls[controlName] = control
        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({formControls, isFormValid
        })


    }
    renderInputs(){
       return Object.keys(this.state.formControls).map((controlName, index)=>{
           const control = this.state.formControls[controlName]
            return(
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid = {control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation} //привели к булу
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }
    render(){
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}
                        <Button type="success"
                                onClick={this.loginHandler}
                                disabled ={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button type="primary"
                                onClick={this.registerHandler}
                               // disabled ={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}