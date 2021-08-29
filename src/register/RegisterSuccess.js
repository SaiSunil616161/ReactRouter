import React, { Component } from "react";
import styled from "styled-components";
import { clearCookies, getCookie, LogoutButton } from "../constants";
import Functionalities from "../Functionalities";
import Login from "../Login";

const Title = styled.div`
    height: 100%;
    width: 100%;
    font-size: 20px;
    font-family: sans-serif;
    padding-left: 3%;
    padding-top: 50%;
    padding-bottom: 10%;
    word-break: break-all;
    `;

const LastButton = styled.button`
    margin-left: 20%;
    font-size: 18px;
    margin-bottom: 125%;
    color: red;
`;
class RegisterSuccess extends Component {
    constructor(props) {
        super(props);
        this.state={MainPage: false}
    }
    redirectToEnterLedger = () => {this.setState({MainPage: true})}
    render() {
        return (
        <div>
            {getCookie("auth") !== undefined && <>
            <LogoutButton onClick={()=>{clearCookies()}}>లాగ్ అవుట్</LogoutButton>
            {!this.state.MainPage && <>
                {this.props.registerPage && <Title>
                    ఐడితో యూజర్ విజయవంతంగా సృష్టించబడింది: {this.props.id}
                </Title>}
                {!this.props.registerPage && <Title>
                    ఇచ్చిన ఐడితో యూజర్ అందుబాటులో లేరు
                </Title>}
                <LastButton onClick={()=>{this.redirectToEnterLedger()}}>ప్రధాన పేజీకి వెళ్లండి</LastButton>
            </>}
            {this.state.MainPage && <Functionalities/>}
            </>}
            {getCookie("auth") === undefined && <Login/>}
        </div>
        );
    }
}
 
export default RegisterSuccess;