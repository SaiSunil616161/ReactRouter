import axios from "axios";
import React, { Component } from "react";
import styled from "styled-components";
import { MAIN_URL } from "../constants";
import Functionalities from "../Functionalities";
import LoaderComp from "../Loader";
import Login from "../Login";


const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #ff0000;
  margin-bottom: 5em;
    padding-top: 4em;
`;

const UserLabel = styled.label`
    font-size: 20px;
    color: blue;
    font-family: sans-serif;
    margin-right: 27%;
    margin-left: 10px;
`;

const PasswordLabel1 = styled.label`
    font-size: 20px;
    color: blue;
    font-family: sans-serif;
    margin-right: 21%;
    margin-left: 10px;
`;

const OtpLabel = styled.label`
    font-size: 20px;
    color: blue;
    font-family: sans-serif;
    margin-right: 12%;
    margin-left: 10px;
`;

const EmailIdLabel = styled.label`
    font-size: 20px;
    color: blue;
    font-family: sans-serif;
    margin-right: 7px;
    margin-left: 8px;
`;

const PasswordLabel = styled.label`
    font-size: 20px;
    color: blue;
    font-family: sans-serif;
    margin-right: 55px;
    margin-left: 27%;
`;

const MainDiv = styled.div`
background: #ccff00;
    height: 100%;
    width: 100%;
`;

const TextAddress = styled.textarea`
margin-left: 15%;
margin-top: 4%;
`;

const NewUserButton = styled.button`
    margin-left: 7%;
    font-size: 18px;
    margin-bottom: 100%;
`

const ErrorLabel = styled.label`
margin-left: 20%;
    color: red;
    `;

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state={name: "", address: "", userId: "", password: "", userExists: false, passwordError: false, showFunctionalities: false, otpError: false, userOtpError: false, ownerOtpError: false, emailId: "", userOtp: "", ownerOtp: "", emailIdError: false, showOtpDeatils: false, loader: false, nameError: false, addressError: false}
    }
  setName = (ev) => {this.setState({name: ev.target.value})}
  setAddress = (ev) => {this.setState({address: ev.target.value})}
  setEmailId = (ev) => {this.setState({emailId: ev.target.value})}
  setPassword = (ev) => {this.setState({password: ev.target.value})}
  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  createNewUser =() => {
    this.setState({loader: true})
    if (this.state.name === "") {this.setState({nameError: true, loader: false})} else {this.setState({nameError: false})}
    if (this.state.address.length < 10) {this.setState({addressError: true, loader: false})} else {this.setState({addressError: false})}
    if (this.state.password === "") {this.setState({passwordError: true, loader: false})} else {this.setState({passwordError: false})}
    if (this.state.emailId === "") {this.setState({emailIdError: true, loader: false})} 
    else if (!this.validateEmail(this.state.emailId)) {
        this.setState({emailIdError: true})
    } else this.setState({emailIdError: false})
    if (this.state.anme !== "" && this.state.password !== "" && this.state.address.length >= 10 && this.validateEmail(this.state.emailId)) {
        let obj = {};
        obj.name = this.state.name;
        obj.emailId = this.state.emailId;
        obj.address = this.state.address;
        obj.password = this.state.password;
        obj.userOtp = this.state.userOtp;
        obj.ownerOtp = this.state.ownerOtp;
        obj.verified = false;
        const NEW_USER_URL = `${MAIN_URL}/addNewUser`
        axios.post(NEW_USER_URL ,obj).then(response => {
            if (response.data) {
                this.setState({loader: false, showOtpDeatils: true, userId: response.data})
            } else {
                this.setState({loader: false, showOtpDeatils: false, userExists: true})
            }
        }).catch(error => {
            this.setState({loader: false, showOtpDeatils: false, userExists: true})
        });
    }
  }
  setUserOtp = (ev) => {this.setState({userOtp: ev.target.value})}
  setOwnerOtp = (ev) => {this.setState({ownerOtp: ev.target.value})}
  validateOtp = () => {
    this.setState({loader: true})
    if (this.state.userOtp === "") {this.setState({userOtpError: true, loader: false})} else {this.setState({userOtpError: false})}
    if (this.state.ownerOtp === "") {this.setState({ownerOtpError: true, loader: false})} else {this.setState({ownerOtpError: false})}
    if (this.state.userOtp !== "" && this.state.ownerOtp !== "") {
        let obj = {};
        obj.name = this.state.name;
        obj.emailId = this.state.emailId;
        obj.address = this.state.address;
        obj.password = this.state.password;
        obj.userOtp = this.state.userOtp;
        obj.ownerOtp = this.state.ownerOtp;
        obj.verified = false;
        obj.id = this.state.userId;
        const VERIFY_URL = `${MAIN_URL}/verifyOtp`
        axios.post(VERIFY_URL ,obj).then(response => {
            if (response.data) {
                this.setState({loader: false, showFunctionalities: true})
            } else {
                this.setState({loader: false, otpError: true})
            }
        }).catch(error => {
            this.setState({loader: false, otpError: true})
        });
    }
  }
  render(){
      return (
        <>
        {this.state.loader && <LoaderComp/>}
        {!this.state.loader && !this.state.showFunctionalities && <>
            <Title>కొత్త వినియోగదారు వివరాలు</Title>
            {!this.state.showOtpDeatils && <> <UserLabel>పేరు :</UserLabel>
            <input type="text" onChange={(event)=>{this.setName(event)}}/>
            {this.state.nameError && <><br/><br/><ErrorLabel>దయచేసి పేరు నమోదు చేయండి</ErrorLabel></>}
            <br/><br/>
            <EmailIdLabel>ఇమెయిల్ ఐడి :</EmailIdLabel>
            <input type="text" onChange={(event)=>{this.setEmailId(event)}}/>
            {this.state.emailIdError && <><br/><br/><ErrorLabel>దయచేసి ఇమెయిల్ ఐడిని నమోదు చేయండి</ErrorLabel></>}
            <br/><br/>
            <PasswordLabel1>పాస్వర్డ్ :</PasswordLabel1>
            <input type="password" onChange={(event)=>{this.setPassword(event)}}/>
            {this.state.emailIdError && <><br/><br/><ErrorLabel>దయచేసి పాస్వర్డ్ని నమోదు చేయండి</ErrorLabel></>}
            <br/><br/>
            <PasswordLabel>చిరునామా</PasswordLabel>
            <TextAddress id="address" name="address" rows="4" cols="30"  onChange={(event)=>{this.setAddress(event)}}></TextAddress>
            {this.state.addressError && <><br/><br/><ErrorLabel>దయచేసి చిరునామాను నమోదు చేయండి</ErrorLabel></>}
            <br/><br/>
            {this.state.userExists && <><br/><br/><ErrorLabel>యూజర్ ఇప్పటికే ఇమెయిల్ ఐడితో ఉన్నారు</ErrorLabel></>}
            <br/><br/>
            <NewUserButton onClick={()=>{this.createNewUser()}}>
            కొత్త వినియోగదారుని సృష్టించండి</NewUserButton> </>}
            {this.state.showOtpDeatils && !this.state.showFunctionalities && <> <OtpLabel>మీ ఇమెయిల్ కి పంపించిన ఓటీపీని ఇవ్వండి:</OtpLabel>
            <input type="number" onChange={(event)=>{this.setUserOtp(event)}}/>
            {this.state.userOtpError && <><br/><br/><ErrorLabel>దయచేసి చెల్లుబాటు అయ్యే ఓటీపీ ని నమోదు చేయండి</ErrorLabel></>}
            <br/><br/>
            <OtpLabel>మీ యజమాని ఇమెయిల్ కి పంపించిన ఓటీపీ :</OtpLabel>
            <input type="number" onChange={(event)=>{this.setOwnerOtp(event)}}/>
            {this.state.ownerOtpError && <><br/><br/><ErrorLabel>దయచేసి చెల్లుబాటు అయ్యే ఓటీపీ ని నమోదు చేయండి</ErrorLabel></>}
            <br/><br/>
            {this.state.otpError && <><br/><br/><ErrorLabel>దయచేసి చెల్లుబాటు అయ్యే ఓటీపీలను నమోదు చేయండి</ErrorLabel>
            </>}            
            <NewUserButton onClick={()=>{this.validateOtp()}}>
            ఓటీపీలను ధృవీకరించండి</NewUserButton> </>}
            </>}
        {this.state.showFunctionalities && <Login/>}
        </>
      )
  }
}
 
export default CreateUser;