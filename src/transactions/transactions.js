import React, { Component } from "react";
import styled from "styled-components";
import Functionalities from "../Functionalities";

const Table = styled.table`
border: double;
margin-left: 40px;
    padding-top: 3%;
    `;

const LastButton = styled.button`
    margin-left: 20%;
    font-size: 18px;
    margin-bottom: 150%;
    margin-top: 3%;
    color: red;
`;

const LastButton1 = styled.button`
    margin-left: 26%;
    font-size: 18px;
    margin-bottom: 150%;
    margin-top: 3%;
    color: red;
`;

const ErrorLabel = styled.label`
margin-left: 15%;
    color: red;
    `;

const Label = styled.div`
padding-top: 75%;
    padding-bottom: 200%;
    font-size: 17px;
    `;

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state={MainPage: false, error: true}
    }
  redirectToEnterLedger = () => {this.setState({MainPage: true, error: false})};
  getFinalBalance = (data) => {
      let creditData = data.filter(d => d.transactionType === "credit");
      let debitData = data.filter(d => d.transactionType === "debit");
      let creditAmount = 0;
      let debitAmount = 0;
      creditData.forEach(cd => creditAmount += parseInt(cd.amount));
      debitData.forEach(cd => debitAmount += parseInt(cd.amount));
      return creditAmount - debitAmount;
  }
  render(){
    let listItems = this.props.data.map(function(person, i) {
        return(
            <tr key={i}>
                <td>{person['userId']}</td>
                <td>{person['amount']}</td>
                <td>{person['transactionType']}</td>
                <td>{person['date']}</td>
            </tr>
        )
    });
      return (
        <div>
            {this.props.data.length === 0 && this.state.error && <Label><ErrorLabel> There is no data associated with this Id</ErrorLabel>
                <LastButton1 onClick={()=>{this.redirectToEnterLedger()}}>Go to Main Page</LastButton1></Label>}
            {!this.state.MainPage && this.props.data.length > 0 && <>
                <ErrorLabel>Final Balance: {this.getFinalBalance(this.props.data)}</ErrorLabel>
                <Table border="1" frame="void" rules="rows">
                    <tbody id="content">
                        <tr>
                            <th>Id</th>
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