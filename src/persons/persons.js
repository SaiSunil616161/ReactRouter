import axios from "axios";
import React, { Component } from "react";
import styled from "styled-components";
import { MAIN_URL } from "../constants";
import Functionalities from "../Functionalities";

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
        axios.get(GET_ALL).then(response => {
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
            {this.state.error && <ErrorLabel> Error While loading details</ErrorLabel>}
            {!this.state.MainPage && <>
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
        </div>
      )
  }
}
 
export default Persons;