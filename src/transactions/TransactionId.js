import axios from "axios";
import React, { Component } from "react";
import styled from "styled-components";
import { clearCookies, getCookie, LogoutButton, MAIN_URL } from "../constants";
import LoaderComp from "../Loader";
import Login from "../Login";
import Transactions from "./transactions";
 
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
    margin-left: 10px;
`;

const LoginButton = styled.button`
    margin-left: 2%;
    font-size: 18px;
    margin-top: 3%;
    margin-bottom: 100%;
`;

const ErrorLabel = styled.label`
margin-left: 23%;
    color: red;
    `;
class TransactionId extends Component {
    constructor(props) {
        super(props);
        this.state={userName:"", userError: false, submitted: false, data: [], error: false}
    }
    setUsrName = (event) => {this.setState({userName: event.target.value})};
    proceedSubmit = () => {
        this.setState({loader: true})
        if(this.state.userName === "") {this.setState({userError: true, loader: false})} else {this.setState({userError: false})}
        if(this.state.userName !== "") {
            const ADD_TRANS = `${MAIN_URL}/getTransactions/${this.state.userName}`;
            axios.get(ADD_TRANS, {headers: {"auth": getCookie("auth"), "username": getCookie("userName")}}).then(response => {
                console.log(response)
                if (response.data) {
                    this.setState({data: response.data, submitted: true, loader: false});
                } else {
                    this.setState({error: true});
                }
            }).catch(error => {
                this.setState({error: true, loader: false});
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
            <Title>వినియోగదారు లావాదేవీలు</Title>
            <UserLabel>రిజిస్టర్డ్ ఐడి: </UserLabel>
            <input type="number"  onChange={(event)=>{this.setUsrName(event)}}/>
            {this.state.userError && <><br/><br/><ErrorLabel>దయచేసి రిజిస్టర్ ఐడిని ఇవ్వండి</ErrorLabel></>}
            {this.state.error && <><br/><br/><ErrorLabel>దయచేసి సరైన రిజిస్టర్ ఐడిని ఇవ్వండి</ErrorLabel></>}
            <br/><br/><LoginButton onClick={()=>{this.proceedSubmit()}}>వినియోగదారు లావాదేవీలను పొందండి</LoginButton>
            </>}
            {this.state.submitted && <Transactions data={this.state.data}/>}</>}
            </>}
            {getCookie("auth") === undefined && <Login/>}
        </div>
        );
    }
}
 
export default TransactionId;