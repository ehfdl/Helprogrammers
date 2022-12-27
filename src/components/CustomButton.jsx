import styled from 'styled-components';

export default styled.button`
  width: 60px;
  height: 40px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundcolor};
  left: ${(props) => props.left};
  margin-left: ${(props) => props.marginleft};
  border-radius: 20px;
  border: transparent;
  position: relative;
  cursor: pointer;
`;
