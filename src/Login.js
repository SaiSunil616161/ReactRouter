import React, { Component } from "react";
import styled from "styled-components";
import Functionalities from "./Functionalities";
import LoaderComp from "./Loader";
import axios from "axios";
import { MAIN_URL } from "./constants";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #ff0000;
  margin-bottom: 5em;
    padding-top: 4em;
`;

const UserLabel = styled.label`
    font-size: 20px;
    color: blue;
    font-family: sans-serif;
    margin-right: 50px;
    margin-left: 10px;
`;

const PasswordLabel = styled.label`
    font-size: 20px;
    color: blue;
    font-family: sans-serif;
    margin-right: 30px;
    margin-left: 10px;
`;

const MainDiv = styled.div`
background: #ccff00;
    height: 100%;
    width: 100%;
`;

const LoginButton = styled.button`
    margin-left: 38%;
    font-size: 18px;
    margin-bottom: 100%;
`;

const ErrorLabel = styled.label`
margin-left: 23%;
    color: red;
    `;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state={userName:"", password:"", redirectToHome: false, loginError: false}
    }
    setUserName = (event) => {this.setState({userName: event.target.value})};
    setPassword = (event) => {this.setState({password: event.target.value})};
    proceedLogin = () => {
        this.setState({loader: true})
        if (this.state.userName === "") {this.setState({userNameError: true, loader: false})} else {this.setState({userNameError: false})}
        if (this.state.password === "") {this.setState({passwordError: true, loader: false})} else {this.setState({passwordError: false})}
        if (this.state.userName !== "" && this.state.password !== "") {
            let obj = {};
            obj.userName = this.state.userName;
            obj.password = this.state.password;
            const LOGIN_URL = `${MAIN_URL}/login`
            axios.post(LOGIN_URL ,obj).then(response => {
                if (response.data) {
                    this.setState({redirectToHome: true, loader: false})
                } else {
                    this.setState({loginError: true, loader: false})
                }
            })
        }
    }
    render() {
        return (
        <MainDiv>
            {this.state.loader && <LoaderComp/>}
            {!this.state.loader && <>
            {!this.state.redirectToHome && <><Title>Login</Title>
            <UserLabel>User ID:</UserLabel>
            <input type="text" onChange={(event)=>{this.setUserName(event)}}/>
            {this.state.userNameError && <><br/><br/><ErrorLabel>Please Enter UserName</ErrorLabel></>}
            <br/><br/>
            <PasswordLabel>Password:</PasswordLabel>
            <input type="password" onChange={(event)=>{this.setPassword(event)}}/>
            {this.state.passwordError && <><br/><br/><ErrorLabel>Please Enter Password</ErrorLabel></>}
            <br/><br/>
            {this.state.loginError && <ErrorLabel>Please enter correct details</ErrorLabel>}
            <LoginButton onClick={()=>{this.proceedLogin()}}>
                Log In</LoginButton></>}
            {this.state.redirectToHome && <Functionalities/>}</>}
        </MainDiv>
        );
    }
}
 
export default Login;