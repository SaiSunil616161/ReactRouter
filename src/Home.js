import React, { Component } from "react";
import styled from "styled-components";
import Functionalities from "./Functionalities";
import LoaderComp from "./Loader";
import Stuff from "./Stuff";
import axios from "axios";
import { MAIN_URL } from "./constants";
import RegisterSuccess from "./register/RegisterSuccess";
 
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
    margin-right: 21%;
    margin-left: 10px;
`;

const AmountLabel = styled.label`
    font-size: 20px;
    color: blue;
    font-family: sans-serif;
    margin-right: 15%;
    margin-left: 10px;
`;

const DateLabel = styled.label`
    font-size: 20px;
    color: blue;
    font-family: sans-serif;
    margin-right: 20%;
    margin-left: 10px;
`;

const CreditInput = styled.input`
margin-left: 15%;
margin-right: 3%;
`;

const DebitInput = styled.input`
margin-left: 15%;
margin-right: 3%;
`;

const DebitLabel = styled.span`
font-size: 20px;
    color: black;
    font-family: sans-serif;
`;

const CreditLabel = styled.span`
font-size: 20px;
    color: red;
    font-family: sans-serif;
`;
const LoginButton = styled.button`
    margin-left: 25%;
    font-size: 18px;
    margin-top: 3%;
    margin-bottom: 40%;
`;

const ErrorLabel = styled.label`
margin-left: 23%;
    color: red;
    `;

const LastButton = styled.button`
    margin-left: 28%;
    font-size: 18px;
    margin-bottom: 20%;
    color: red;
`;
class Home extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        const month = date.getMonth() + 1
        this.state={id:"", amount:"", data: {}, dateVal: date.getDate() + '-' + month + '-' + date.getFullYear(), amountType: "", submitted: false, MainPage: false, beerror: false}
    }
    setId = (event) => {this.setState({id: event.target.value})};
    setAmount = (event) => {this.setState({amount: event.target.value})};
    setDate = (event) => {this.setState({dateVal: event.target.value})}
    setAmountType = (val) => {this.setState({amountType: val})}
    proceedSubmit = () => {
        this.setState({loader: true})
        if (isNaN(parseInt(this.state.id))) {this.setState({idError: true, loader: false})} else {this.setState({idError: false})}
        if (isNaN(parseInt(this.state.amount))) {this.setState({amountError: true, loader: false})} else {this.setState({amountError: false})}
        if (this.state.amountType === "credit" || this.state.amountType === "debit") {this.setState({dcError: false})} else {this.setState({dcError: true, loader: false})}
        if (!isNaN(parseInt(this.state.id)) && !isNaN(parseInt(this.state.amount)) && this.state.amountType !== "") {
            let obj = {};
            obj.userId = parseInt(this.state.id);
            obj.amount = this.state.amount;
            obj.date = this.state.dateVal;
            obj.transactionType = this.state.amountType;
            const TRANS_URL = `${MAIN_URL}/addTransaction`
            axios.post(TRANS_URL ,obj).then(response => {
                if (response.data) {
                    this.setState({submitted: true, loader: false, data: response.data});
                } else {
                    this.setState({submitted: false, loader: false, beerror: true});
                }
            }).catch(error => {
                this.setState({submitted: false, loader: false, beerror: true});
            });
        }
    }
    redirectToEnterLedger = () => {this.setState({MainPage: true})}
    render() {
        return (
        <div>
            {this.state.beerror && <><RegisterSuccess registerPage={false}/></>}
            {this.state.MainPage && <Functionalities/>}
            {!this.state.MainPage && <>
            {this.state.loader && <LoaderComp/>}
            {!this.state.loader && <>
            {!this.state.submitted && <>
            <Title>లెడ్జర్</Title>
            <UserLabel>ఐడి: </UserLabel>
            <input type="number"  onChange={(event)=>{this.setId(event)}}/>
            {this.state.idError && <><br/><br/><ErrorLabel>దయచేసి ఐడి ని నమోదు చేయండి</ErrorLabel></>}
            <br/><br/>
            <AmountLabel>డబ్బు: </AmountLabel>
            <input type="number"  onChange={(event)=>{this.setAmount(event)}}/>
            {this.state.amountError && <><br/><br/><ErrorLabel>దయచేసి మొత్తాన్ని నమోదు చేయండి</ErrorLabel></>}
            <br/><br/>
            <DateLabel>తేదీ: </DateLabel>
            <input type="text" disabled defaultValue={this.state.dateVal} onChange={(event)=>{this.setDate(event)}}/>
            <br/><br/>
            <DebitInput type="radio" id="debit" name="Debit" value="debit" onClick={()=>{this.setAmountType("debit")}} />
            <DebitLabel>డెబిట్</DebitLabel>
            <CreditInput type="radio" id="debit" name="Debit" value="credit" onClick={()=>{this.setAmountType("credit")}}/>
            <CreditLabel>క్రెడిట్</CreditLabel>
            {this.state.dcError && <><br/><br/><ErrorLabel>దయచేసి క్రెడిట్/డెబిట్ ఎంచుకోండి</ErrorLabel></>}
            <LoginButton onClick={()=>{this.proceedSubmit()}}>సబ్మిట్ చేయండి</LoginButton>
            <LastButton onClick={()=>{this.redirectToEnterLedger()}}>ప్రధాన పేజీకి వెళ్లండి</LastButton>
            </>}
            {this.state.submitted && <Stuff amount={this.state.amount} remainingAmount={this.state.data.amount} name={this.state.data.name} amountType={this.state.amountType}/>}</>}
            </>}
        </div>
        );
    }
}
 
export default Home;