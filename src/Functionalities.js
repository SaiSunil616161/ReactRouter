import axios from "axios";
import React, { Component } from "react";
import styled from "styled-components";
import { clearCookies, getCookie, MAIN_URL } from "./constants";
import Home from "./Home";
import Login from "./Login";
import Persons from "./persons/persons";
import Register from "./register/Register";
import TransactionId from "./transactions/TransactionId";
 
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #ff0000;
  margin-bottom: 2em;
    padding-top: 3em;
`;

const LoginButton = styled.button`
    margin-left: 10%;
    font-size: 18px;
    margin-bottom: 10px;
    color: red;
`;

const LogoutButton = styled.button`
margin-left: 68%;
font-size: 18px;
margin-top: 15px;
color: red;
`;

const LastButton = styled.button`
    margin-left: 10%;
    font-size: 18px;
    margin-bottom: 100%;
    color: red;
`;

class Functionalities extends Component {
    constructor(props) {
        super(props);
        this.state={LedgerPage: false, getEmail: true, clickedFunctionality: false, registerUser: false, getPersons: false, transactions: false}
    }
    redirectToEnterLedger = () => {this.setState({LedgerPage: true,clickedFunctionality: true})}
    redirectToRegistration = () => {this.setState({registerUser: true,clickedFunctionality: true})}
    redirectToPersonsIds = () => {this.setState({getPersons: true,clickedFunctionality: true})}
    redirectToGetTransactions = () => {this.setState({transactions: true,clickedFunctionality: true})}
    getLedgerThroughEmail = () => {
        const SEND_EMAIL = `${MAIN_URL}/sendEmail`;
        axios.get(SEND_EMAIL, {headers: {"auth": getCookie("auth"), "username": getCookie("userName")}}).then(response => {
            if (response.data) {
                alert("Email sent succesfully");
            } else {
                alert("Error while sending email. Please try after sometime");
            }
        }).catch(error => {
            alert("Error while sending email. Please try after sometime");
        });
    }
    render() {
        return (
        <div>
            {getCookie("auth") !== undefined && <>
                {!this.state.clickedFunctionality && <>
                <LogoutButton onClick={()=>{clearCookies()}}>లాగ్ అవుట్</LogoutButton>
                <Title>సంబంధిత కార్యాచరణలకు కింద బటన్లు పై క్లిక్ చేయండి</Title>
                <LoginButton onClick={()=>{this.redirectToRegistration()}}>వ్యక్తులను నమోదు చేయండి</LoginButton>        
                <LoginButton onClick={()=>{this.redirectToPersonsIds()}}>ఐడి ఉన్న వ్యక్తులందరినీ పొందండి</LoginButton>
                <LoginButton onClick={()=>{this.redirectToGetTransactions()}}>ఐడి ద్వారా అన్ని లావాదేవీలను పొందండి</LoginButton>
                <LoginButton onClick={()=>{this.redirectToEnterLedger()}}>లెడ్జర్‌ని నమోదు చేయండి</LoginButton>
                <LastButton onClick={()=>{this.getLedgerThroughEmail()}}>బ్యాలెన్స్ షీట్ ఇమెయిల్ ద్వార పొందండి</LastButton></>}
                {this.state.LedgerPage && <Home/>}
                {this.state.registerUser && <Register/>}
                {this.state.getPersons && <Persons/>}
                {this.state.transactions && <TransactionId/>}
            </>}
            {getCookie("auth") === undefined && <Login/>}
        </div>
        );
    }
}
 
export default Functionalities;