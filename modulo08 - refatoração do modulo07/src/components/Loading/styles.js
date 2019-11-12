import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
export const Container = styled.div`

display:flex;
height:100%;
justify-content:center;
align-items:center;
align-self:center;
margin: 50px 0;
`;

const rotate = keyframes`
  from{
    transform:rotate(0deg)
  }
  to{
    transform:rotate(360deg)
  }
`;

export const Spinner = styled(FaSpinner).attrs(props => ({
  size: props.size
}))`
  animation: ${rotate} 2s linear infinite;
`;

Spinner.defaultProps = {
  color: '#7159c1',
  size: 30
}

export const SpinnerLigth = styled(FaSpinner)`
  animation: ${rotate} 2s linear infinite;
`;

SpinnerLigth.defaultProps = {
  color: '#fff',
  size: 30
}


