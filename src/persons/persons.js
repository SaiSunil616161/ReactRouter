import React, { Component } from "react";
import styled from "styled-components";
import Functionalities from "../Functionalities";

const Table = styled.table`
margin-left: 30%;
border: double;
    `;

const LastButton = styled.button`
    margin-left: 20%;
    font-size: 18px;
    margin-bottom: 100%;
    margin-top: 3%;
    color: red;
`;

class Persons extends Component {
    constructor(props) {
        super(props);
        this.state={data: [
            {id: 1, name: "Mahesh"},
            {id: 2, name: "Mahesh"},
            {id: 3, name: "Mahesh"},
            {id: 4, name: "Mahesh"},
            {id: 5, name: "Mahesh"},
            {id: 6, name: "Mahesh"},
            {id: 7, name: "Mahesh"},
            {id: 8, name: "Mahesh"},
            {id: 9, name: "Mahesh"},
            {id: 10, name: "Mahesh"},
            {id: 11, name: "Mahesh"},
            {id: 12, name: "Mahesh"},
            {id: 13, name: "Mahesh"},
            {id: 14, name: "Mahesh"},
            {id: 15, name: "Mahesh"},
            {id: 16, name: "Mahesh"},
            {id: 17, name: "Mahesh"},
            {id: 18, name: "Mahesh"},
            {id: 19, name: "Mahesh"},
            {id: 20, name: "Mahesh"},
            {id: 21, name: "Mahesh"},
            {id: 22, name: "Mahesh"},
            {id: 23, name: "Mahesh"},
            {id: 24, name: "Mahesh"},
            {id: 25, name: "Mahesh"},
            {id: 26, name: "Mahesh"}
        ], MainPage: false}
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
                <LastButton onClick={()=>{this.redirectToEnterLedger()}}>Go to Main Page</LastButton>
            </>}
            {this.state.MainPage && <Functionalities/>}
        </div>
      )
  }
}
 
export default Persons;