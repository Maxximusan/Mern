import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
    const [form, setform] = useState({ email: '', password: '' })
    const { loading, request, error, clearError} = useHttp()
    const message = useMessage()

    useEffect(() => {
        message(error)
        clearError()
},[error, message, clearError])

    const changeHandler = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setform({ ...form, [e.target.name]: e.target.value })     
    }
    
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            console.log('DATA', data);
            message(data.message)
            
        } catch (err) {
            
    }
    }
    
     const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            console.log('DATA', data);
            message(data.message)
            
        } catch (err) {
            
    }
}

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>AuthPage - Сократи ссылку</h2>
                <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Авторизация</span>
             <div>
                    <div className="input-field ">
                                <input
                                    placeholder="Введите емейл"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                
          <label htmlFor="Email"></label>
                            </div>      
                            
                            <div className="input-field ">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                     />
                                
          <label htmlFor="password"></label>
        </div>     

          </div>
                    </div>
        <div className="card-action">
             <button className="btn yellow darken-4" style={{marginRight: 10}} onClick={loginHandler} disabled={loading}>Войти</button>
             <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Регистрация</button>
        </div>
      </div>
            </div>
        </div>
    )
}