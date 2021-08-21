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
            {this.props.amountType === "debit" && <Title>{this.props.name} చెల్లించారు {this.props.amount}</Title>}
            {this.props.amountType === "credit" && <Title>మనము {this.props.name} కి {this.props.amount} ఇచ్చాము </Title>}
            <TitleOt>అతను ఇంకా చెలించాల్సింది: {this.props.remainingAmount} రూపాయలు</TitleOt>
            <LastButton onClick={()=>{this.redirectToEnterLedger()}}>ప్రధాన పేజీకి వెళ్లండి</LastButton></>}
            {this.state.MainPage && <Functionalities/>}
        </div>
        );
    }
}
 
export default Stuff;