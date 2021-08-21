import React, { Component } from "react";
import styled from "styled-components";
import Functionalities from "./Functionalities";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #ff0000;
    padding-top: 4em;
`;

const TitleOt = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #ff0000;
    padding-top: 1em;
`;

const LastButton = styled.button`
    margin-left: 28%;
    font-size: 18px;
    margin-bottom: 125%;
    color: red;
`;

class Stuff extends Component {
    constructor(props) {
        super(props);
        this.state={MainPage: false}
    }
    redirectToEnterLedger = () => {this.setState({MainPage: true})}
    render() {
        return (
        <div>
            {!this.state.MainPage && <>
            {this.props.amountType === "debit" && <Title>{this.props.name} Paid {this.props.amount}</Title>}
            {this.props.amountType === "credit" && <Title>We gave {this.props.amount} to {this.props.name}</Title>}
            <TitleOt>He Still needs to pay {this.props.remainingAmount} rupees</TitleOt>
            <LastButton onClick={()=>{this.redirectToEnterLedger()}}>Go to Main Page</LastButton></>}
            {this.state.MainPage && <Functionalities/>}
        </div>
        );
    }
}
 
export default Stuff;