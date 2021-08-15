import React, { Component } from "react";
import styled from "styled-components";
import Home from "./Home";
 
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
        this.state={LedgerPage: false}
    }
    redirectToEnterLedger = () => {this.setState({LedgerPage: true})}
    render() {
        return (
        <div>
            {!this.state.LedgerPage && <>
            <Title>Click on button to navigate to corresponding functionalities</Title>
            <LoginButton onClick={()=>{this.redirectToRegistration()}}>Register Persons</LoginButton>        
            <LoginButton onClick={()=>{this.redirectToPersonsIds()}}>Get all persons with Id</LoginButton>
            <LoginButton onClick={()=>{this.redirectToGetTransactions()}}>Get all transactions by Id</LoginButton>
            <LastButton onClick={()=>{this.redirectToEnterLedger()}}>Enter Ledger</LastButton></>}
            {this.state.LedgerPage && <Home/>}
        </div>
        );
    }
}
 
export default Functionalities;