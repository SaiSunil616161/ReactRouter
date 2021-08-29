import React, { Component } from "react";
import styled from "styled-components";
import Functionalities from "./Functionalities";
import LoaderComp from "./Loader";
import axios from "axios";
import { MAIN_URL } from "./constants";
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
            axios.post(LOGIN_URL ,obj).then(response => {
                if (response.data) {
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
            {this.state.loader && <LoaderComp/>}
            {!this.state.loader && <>
            {!this.state.redirectToHome && !this.state.createUser && <><Title>లాగిన్</Title>
            <UserLabel>లాగిన్ ఇమెయిల్ :</UserLabel>
            <input type="text" onChange={(event)=>{this.setUserName(event)}}/>
            {this.state.userNameError && <><br/><br/><ErrorLabel>సరైన లాగిన్ ఐడి ఇవ్వండి</ErrorLabel></>}
            <br/><br/>
            <PasswordLabel>పాస్వర్డ్ :</PasswordLabel>
            <input type="password" onChange={(event)=>{this.setPassword(event)}}/>
            {this.state.passwordError && <><br/><br/><ErrorLabel>సరైన పాస్‌వర్డ్ ఇవ్వండి</ErrorLabel></>}
            <br/><br/>
            {this.state.loginError && <ErrorLabel>సరైన సమాచరం ఇవ్వండి</ErrorLabel>}
            <LoginButton onClick={()=>{this.proceedLogin()}}>
               లాగిన్ చేయండి</LoginButton>
            <NewUserButton onClick={()=>{this.createNewUser()}}>
            కొత్త యూజర్ ని క్రియేట్ చేయండి</NewUserButton>   
            </>}
            {this.state.redirectToHome && !this.state.createUser && <Functionalities/>}
            {this.state.createUser && <CreateUser/>}</>}
        </MainDiv>
        );
    }
}
 
export default Login;