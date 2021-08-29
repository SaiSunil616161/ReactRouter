import axios from "axios";
import React, { Component } from "react";
import styled from "styled-components";
import { clearCookies, getCookie, LogoutButton, MAIN_URL } from "../constants";
import LoaderComp from "../Loader";
import Login from "../Login";
import RegisterSuccess from "./RegisterSuccess";
 
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #ff0000;
  margin-bottom: 2em;
    padding-top: 4em;
`;

const UserLabel = styled.label`
    font-size: 20px;
    color: blue;
    font-family: sans-serif;
    margin-right: 6%;
    margin-left: 20%;
`;

const LoginButton = styled.button`
    margin-left: 6%;
    font-size: 18px;
    margin-top: 3%;
    margin-bottom: 100%;
`;

const ErrorLabel = styled.label`
margin-left: 23%;
    color: red;
    `;
class Register extends Component {
    constructor(props) {
        super(props);
        this.state={userName:"", userError: false, userExistingError: false, submitted: false, id: ""}
    }
    setUsrName = (event) => {this.setState({userName: event.target.value})};
    proceedSubmit = () => {
        this.setState({loader: true})
        if(this.state.userName === "") {this.setState({userError: true, loader: false})} else {this.setState({userError: false})}
        if(this.state.userName !== "") {
            const ADD_USER = `${MAIN_URL}/addUser`;
            let obj = {};
            obj.name = this.state.userName;
            axios.post(ADD_USER ,obj, {headers: {"auth": getCookie("auth"), "username": getCookie("userName")}}).then(response => {
                if (response.data.id) {
                    this.setState({userExistingError: false, submitted: true, loader: false, id: response.data.id});
                } else {
                    this.setState({userExistingError: true, loader: false});
                }
            }).catch(error => {
                this.setState({userExistingError: true, submitted: false, loader: false});
            });
        }
    }
    render() {
        return (
        <div>
            {getCookie("auth") !== undefined && <>
            {this.state.loader && <LoaderComp/>}
            {!this.state.loader && <>
            {!this.state.submitted && <>
            <LogoutButton onClick={()=>{clearCookies()}}>లాగ్ అవుట్</LogoutButton>
            <Title>వినియోగదారుని నమోదు చేయండి</Title>
            <UserLabel>వినియోగదారుని పేరు </UserLabel>
            <input type="text" style={{marginLeft: "23%"}}  onChange={(event)=>{this.setUsrName(event)}}/>
            {this.state.userError && <><br/><br/><ErrorLabel>దయచేసి వినియోగదారు పేరు నమోదు చేయండి</ErrorLabel></>}
            {this.state.userExistingError && <><br/><br/><ErrorLabel>ఈ పేరు ఇప్పటికే తీసుకోబడింది. దయచేసి పేరును సవరించడానికి ప్రయత్నించండి</ErrorLabel></>}
            <br/><br/><LoginButton onClick={()=>{this.proceedSubmit()}}>వినియోగదారుని నమోదు చేయండి</LoginButton>
            </>}
            {this.state.submitted && <RegisterSuccess id={this.state.id} registerPage={true}/>}</>}
            </>}
            {getCookie("auth") === undefined && <Login/>}
        </div>
        );
    }
}
 
export default Register;