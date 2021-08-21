import React, { Component } from "react";
import styled from "styled-components";
import Home from "./Home";
import Persons from "./persons/persons";
import Register from "./register/Register";
import TransactionId from "./transactions/TransactionId";
 
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #ff0000;
  margin-bottom: 2em;
    padding-top: 4em;
`;

const LoginButton = styled.button`
    margin-left: 10%;
    font-size: 18px;
    margin-bottom: 10px;
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
        this.state={LedgerPage: false, clickedFunctionality: false, registerUser: false, getPersons: false, transactions: false}
    }
    redirectToEnterLedger = () => {this.setState({LedgerPage: true,clickedFunctionality: true})}
    redirectToRegistration = () => {this.setState({registerUser: true,clickedFunctionality: true})}
    redirectToPersonsIds = () => {this.setState({getPersons: true,clickedFunctionality: true})}
    redirectToGetTransactions = () => {this.setState({transactions: true,clickedFunctionality: true})}
    render() {
        return (
        <div>
            {!this.state.clickedFunctionality && <>
            <Title>సంబంధిత కార్యాచరణలకు కింద బటన్లు పై క్లిక్ చేయండి</Title>
            <LoginButton onClick={()=>{this.redirectToRegistration()}}>వ్యక్తులను నమోదు చేయండి</LoginButton>        
            <LoginButton onClick={()=>{this.redirectToPersonsIds()}}>ఐడి ఉన్న వ్యక్తులందరినీ పొందండి</LoginButton>
            <LoginButton onClick={()=>{this.redirectToGetTransactions()}}>ఐడి ద్వారా అన్ని లావాదేవీలను పొందండి</LoginButton>
            <LastButton onClick={()=>{this.redirectToEnterLedger()}}>లెడ్జర్‌ని నమోదు చేయండి</LastButton></>}
            {this.state.LedgerPage && <Home/>}
            {this.state.registerUser && <Register/>}
            {this.state.getPersons && <Persons/>}
            {this.state.transactions && <TransactionId/>}
        </div>
        );
    }
}
 
export default Functionalities;