import React, { Component } from "react";
import styled from "styled-components";
import Functionalities from "../Functionalities";

const Table = styled.table`
border: double;
    `;

const LastButton = styled.button`
    margin-left: 20%;
    font-size: 18px;
    margin-bottom: 100%;
    margin-top: 3%;
    color: red;
`;

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state={data: [
            {id: 1, name: "Mahesh", amountType: "Credit", Date:"15-08-2021", amount: 500},
            {id: 2, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 3, name: "Mahesh", amountType: "Credit", Date:"15-08-2021", amount: 500},
            {id: 4, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 5, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 6, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 7, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 8, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 9, name: "Mahesh", amountType: "Credit", Date:"15-08-2021", amount: 500},
            {id: 10, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 11, name: "Mahesh", amountType: "Credit", Date:"15-08-2021", amount: 500},
            {id: 12, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 13, name: "Mahesh", amountType: "Credit", Date:"15-08-2021", amount: 500},
            {id: 14, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 15, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 16, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 17, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 18, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 19, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 20, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 21, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 22, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 23, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 24, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 25, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500},
            {id: 26, name: "Mahesh", amountType: "Debit", Date:"15-08-2021", amount: 500}
        ], MainPage: false}
    }
    redirectToEnterLedger = () => {this.setState({MainPage: true})}
  render(){
    let listItems = this.state.data.map(function(person, i) {
        return(
            <tr key={i}>
                <td>{person['id']}</td>
                <td>{person['name']}</td>
                <td>{person['amount']}</td>
                <td>{person['amountType']}</td>
                <td>{person['Date']}</td>
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
                            <th>Amount</th> 
                            <th>Amount Type</th> 
                            <th>Date</th> 
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
 
export default Transactions;