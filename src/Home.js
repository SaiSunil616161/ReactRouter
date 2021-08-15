import React, { Component } from "react";
import styled from "styled-components";
import LoaderComp from "./Loader";
import Stuff from "./Stuff";
 
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
    margin-right: 6%;
    margin-left: 10px;
`;

const DateLabel = styled.label`
    font-size: 20px;
    color: blue;
    font-family: sans-serif;
    margin-right: 14%;
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
    margin-left: 38%;
    font-size: 18px;
    margin-top: 3%;
    margin-bottom: 100%;
`;

const ErrorLabel = styled.label`
margin-left: 23%;
    color: red;
    `;
class Home extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        const month = date.getMonth() + 1
        this.state={id:"", amount:"", dateVal: date.getDate() + '-' + month + '-' + date.getFullYear(), amountType: "", submitted: false}
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
            this.setState({submitted: true, loader: false})
        }
    }
    render() {
        console.log(this.state.amountType)
        return (
        <div>
            {this.state.loader && <LoaderComp/>}
            {!this.state.loader && <>
            {!this.state.submitted && <>
            <Title>LEDGER</Title>
            <UserLabel>Id: </UserLabel>
            <input type="text"  onChange={(event)=>{this.setId(event)}}/>
            {this.state.idError && <><br/><br/><ErrorLabel>Please Enter ID</ErrorLabel></>}
            <br/><br/>
            <AmountLabel>Amount: </AmountLabel>
            <input type="number"  onChange={(event)=>{this.setAmount(event)}}/>
            {this.state.amountError && <><br/><br/><ErrorLabel>Please Enter Amount</ErrorLabel></>}
            <br/><br/>
            <DateLabel>Date: </DateLabel>
            <input type="text" disabled defaultValue={this.state.dateVal} onChange={(event)=>{this.setDate(event)}}/>
            <br/><br/>
            <DebitInput type="radio" id="debit" name="Debit" value="debit" onClick={()=>{this.setAmountType("debit")}} />
            <DebitLabel>Debit</DebitLabel>
            <CreditInput type="radio" id="debit" name="Debit" value="credit" onClick={()=>{this.setAmountType("credit")}}/>
            <CreditLabel>Credit</CreditLabel>
            {this.state.dcError && <><br/><br/><ErrorLabel>Please Select Credit/Debit</ErrorLabel></>}
            <LoginButton onClick={()=>{this.proceedSubmit()}}>Submit</LoginButton>
            </>}
            {this.state.submitted && <Stuff amount={this.state.amount} amountType={this.state.amountType}/>}</>}
        </div>
        );
    }
}
 
export default Home;