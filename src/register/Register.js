import React, { Component } from "react";
import styled from "styled-components";
import LoaderComp from "../Loader";
import RegisterSuccess from "./RegisterSuccess";
 
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
    margin-right: 6%;
    margin-left: 10px;
`;

const LoginButton = styled.button`
    margin-left: 30%;
    font-size: 18px;
    margin-top: 3%;
    margin-bottom: 100%;
`;

const ErrorLabel = styled.label`
margin-left: 23%;
    color: red;
    `;
class Register extends Component {
    constructor(props) {
        super(props);
        this.state={userName:"", userError: false, userExistingError: false, submitted: false}
    }
    setUsrName = (event) => {this.setState({userName: event.target.value})};
    proceedSubmit = () => {
        this.setState({loader: true})
        if(this.state.userName === "") {this.setState({userError: true, loader: false})} else {this.setState({userError: false})}
        if(this.state.userName !== "") {
            this.setState({submitted: true, loader: false})
        }
    }
    render() {
        return (
        <div>
            {this.state.loader && <LoaderComp/>}
            {!this.state.loader && <>
            {!this.state.submitted && <>
            <Title>Register User</Title>
            <UserLabel>User Name: </UserLabel>
            <input type="text"  onChange={(event)=>{this.setUsrName(event)}}/>
            {this.state.userError && <><br/><br/><ErrorLabel>Please Enter UserName</ErrorLabel></>}
            {this.state.userExistingError && <><br/><br/><ErrorLabel>This name is already taken. Please try modifying name</ErrorLabel></>}
            <br/><br/><LoginButton onClick={()=>{this.proceedSubmit()}}>Register User</LoginButton>
            </>}
            {this.state.submitted && <RegisterSuccess/>}</>}
        </div>
        );
    }
}
 
export default Register;