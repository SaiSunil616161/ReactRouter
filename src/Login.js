import React, { Component } from "react";
import styled from "styled-components";
import Functionalities from "./Functionalities";
import LoaderComp from "./Loader";
import axios from "axios";
import { getCookie, MAIN_URL } from "./constants";
import CreateUser from "./createUser/CreateUser";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #ff0000;
  margin-bottom: 5em;
    padding-top: 4em;
`;

const UserLabel = styled.label`
    font-size: 16px;
    color: blue;
    font-family: sans-serif;
    margin-right: 5px;
    margin-left: 10px;
`;

const PasswordLabel = styled.label`
    font-size: 20px;
    color: blue;
    font-family: sans-serif;
    margin-right: 55px;
    margin-left: 10px;
`;

const MainDiv = styled.div`
background: #ccff00;
    height: 100%;
    width: 100%;
`;

const LoginButton = styled.button`
    margin-left: 27%;
    font-size: 18px;
    margin-bottom: 10%;
`;

const NewUserButton = styled.button`
    margin-left: 7%;
    font-size: 18px;
    margin-bottom: 100%;
`

const ErrorLabel = styled.label`
margin-left: 23%;
    color: red;
    `;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state={userName:"", password:"", createUser: false, redirectToHome: false, loginError: false}
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
            axios.post(LOGIN_URL ,obj, {Headers:{"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers":"X-Total-Results"}}).then(response => {
                if (response.data !== "error") {
                    var now = new Date();
                    var time = now.getTime();
                    time += 60 * 60 * 1000;
                    now.setTime(time);
                    document.cookie = 'auth=' + response.data + '; expires=' + now.toUTCString() + '; path=/; Secure';
                    document.cookie = 'userName=' + this.state.userName + '; expires=' + now.toUTCString() + '; path=/; Secure';
                    this.setState({redirectToHome: true, loader: false})
                } else {
                    this.setState({loginError: true, loader: false})
                }
            }).catch(error => {
                this.setState({loginError: true, loader: false})
            });
        }
    }
    createNewUser = () => {
        this.setState({createUser: true})
    }

    render() {
        return (
        <MainDiv>
            {getCookie("auth") === undefined && <>
                {this.state.loader && <LoaderComp/>}
                {!this.state.loader && <>
                {!this.state.redirectToHome && !this.state.createUser && <><Title>??????????????????</Title>
                <UserLabel>?????????????????? ????????????????????? :</UserLabel>
                <input type="text" onChange={(event)=>{this.setUserName(event)}}/>
                {this.state.userNameError && <><br/><br/><ErrorLabel>???????????? ?????????????????? ????????? ?????????????????????</ErrorLabel></>}
                <br/><br/>
                <PasswordLabel>??????????????????????????? :</PasswordLabel>
                <input type="password" onChange={(event)=>{this.setPassword(event)}}/>
                {this.state.passwordError && <><br/><br/><ErrorLabel>???????????? ?????????????????????????????? ?????????????????????</ErrorLabel></>}
                <br/><br/>
                {this.state.loginError && <ErrorLabel>???????????? ?????????????????? ?????????????????????</ErrorLabel>}
                <LoginButton onClick={()=>{this.proceedLogin()}}>
                ?????????????????? ??????????????????</LoginButton>
                <NewUserButton onClick={()=>{this.createNewUser()}}>
                ??????????????? ??????????????? ?????? ???????????????????????? ??????????????????</NewUserButton>   
                </>}
                {this.state.redirectToHome && !this.state.createUser && <Functionalities/>}
                {this.state.createUser && <CreateUser/>}</>}
            </>}
            {getCookie("auth") !== undefined && <><Functionalities/></>}
        </MainDiv>
        );
    }
}
 
export default Login;