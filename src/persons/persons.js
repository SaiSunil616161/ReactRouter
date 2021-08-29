import axios from "axios";
import React, { Component } from "react";
import styled from "styled-components";
import { clearCookies, getCookie, LogoutButton, MAIN_URL } from "../constants";
import Functionalities from "../Functionalities";
import Login from "../Login";

const Table = styled.table`
margin-left: 30%;
border: double;
    `;

const LastButton = styled.button`
    margin-left: 20%;
    font-size: 18px;
    margin-bottom: 150%;
    margin-top: 3%;
    color: red;
`;


const ErrorLabel = styled.label`
margin-left: 23%;
    color: red;
    `;

class Persons extends Component {
    constructor(props) {
        super(props);
        this.state={data: [], MainPage: false, error: false}
    }
    componentDidMount() {
        const GET_ALL = `${MAIN_URL}/getAll`;
        axios.get(GET_ALL, {headers: {"auth": getCookie("auth"), "username": getCookie("userName")}}).then(response => {
            if (response.data) {
                this.setState({data: response.data});
            } else {
                this.setState({error: true});
            }
        }).catch(error => {
            this.setState({error: true});
        });
    }
  redirectToEnterLedger = () => {this.setState({MainPage: true})}
  render(){
    let listItems = this.state.data.map(function(person, i) {
        return(
            <tr key={i}>
                <td>{person['id']}</td>
                <td>{person['name']}</td>
            </tr>
        )
    });
      return (
        <div>
            {getCookie("auth") !== undefined && <>
            {this.state.error && !this.state.MainPage && <ErrorLabel> వచిండి వివరాలను లోడ్ చేస్తున్నప్పుడు లోపం. దయచేసి కొంతకాలం తర్వాత ప్రయత్నించండి</ErrorLabel>}
            {!this.state.MainPage && <>
                <LogoutButton onClick={()=>{clearCookies()}}>లాగ్ అవుట్</LogoutButton>
                <Table border="1" frame="void" rules="rows">
                    <tbody id="content">
                        <tr>
                            <th>Id</th>
                            <th>Name</th> 
                        </tr>
                        {listItems}
                    </tbody>
                </Table>
                <LastButton onClick={()=>{this.redirectToEnterLedger()}}>ప్రధాన పేజీకి వెళ్లండి</LastButton>
            </>}
            {this.state.MainPage && <Functionalities/>}
            </>}
            {getCookie("auth") === undefined && <Login/>}
        </div>
      )
  }
}
 
export default Persons;