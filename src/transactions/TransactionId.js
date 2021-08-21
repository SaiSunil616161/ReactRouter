import axios from "axios";
import React, { Component } from "react";
import styled from "styled-components";
import { MAIN_URL } from "../constants";
import LoaderComp from "../Loader";
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
    margin-left: 22%;
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
            axios.get(ADD_TRANS).then(response => {
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
            {this.state.loader && <LoaderComp/>}
            {!this.state.loader && <>
            {!this.state.submitted && <>
            <Title>Enter Register Id</Title>
            <UserLabel>Register Id: </UserLabel>
            <input type="number"  onChange={(event)=>{this.setUsrName(event)}}/>
            {this.state.userError && <><br/><br/><ErrorLabel>Please Enter Register Id</ErrorLabel></>}
            {this.state.error && <><br/><br/><ErrorLabel>Please enter proper Id</ErrorLabel></>}
            <br/><br/><LoginButton onClick={()=>{this.proceedSubmit()}}>Get User Transactions</LoginButton>
            </>}
            {this.state.submitted && <Transactions data={this.state.data}/>}</>}
        </div>
        );
    }
}
 
export default TransactionId;