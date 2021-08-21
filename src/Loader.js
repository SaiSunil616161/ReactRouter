import Loader from "react-loader-spinner";
import styled from "styled-components";

const Title = styled.div`
    padding-bottom: 150%;
    margin-left: 27%;
    padding-top: 60%;
`;

const LoaderComp = ()=>{      
    return(
        <Title>
            <Loader
            type="TailSpin"
            color="rgb(229, 34, 236)"
            height="50%"
            width="50%"
            timeout={100000} 
            />
        </Title>
          
    );
}
export default LoaderComp;