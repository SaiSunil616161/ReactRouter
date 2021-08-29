import styled from "styled-components";

export const MAIN_URL = "http://ledgerapplication-env.eba-4emntayk.us-east-2.elasticbeanstalk.com/api/users";
// export const MAIN_URL = "http://localhost:5000/api/users";

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const clearCookies = () => {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.location.reload();
}

export const LogoutButton = styled.button`
margin-left: 68%;
font-size: 18px;
margin-top: 15px;
color: red;
`;