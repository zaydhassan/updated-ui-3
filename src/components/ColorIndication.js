import React from 'react';
import styled from 'styled-components';
 
const ColorContainer = styled.div`
  background-color: ${({ theme }) => theme === 'dark' ? '#000' : '#fff'};
  color: ${({ theme }) => theme === 'dark' ? 'white' : 'black'};
  padding: 5px;
  margin: 20px 0;
  border: 2px solid #3478f6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: ${({ theme }) => theme === 'dark' ? '#1a2f40' : '#e3f2fd'};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  }
`;
 
const Title = styled.h3`
  border-bottom: 2.5px solid burlywood;
  padding-bottom: 9px;
  text-align: center;
  font-size: 1em;
`;
 
const Indicator = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;
 
const ColorSquare = styled.div`
  width: 18px;
  height: 18px;
  background-color: ${props => props.color};
  margin-right: 10px;
  border-radius: 50%;
  box-shadow: 0 0 8px ${props => props.color};
  position: relative;
 
  &:hover {
    box-shadow: 0 0 15px ${props => props.color}, 0 0 20px ${props => props.color};
  }
`;
 
const ColorIndication = ({ theme }) => {
  return (
    <ColorContainer theme={theme}>
      <Title>THREAT LEVELS</Title>
      <Indicator>
        <ColorSquare color="#ff5d3d" /> <span>MOST AFFECTED</span>
      </Indicator>
      <Indicator>
        <ColorSquare color="#ffab3d" /> <span>MODERATE</span>
      </Indicator>
      <Indicator>
        <ColorSquare color="#ffb494" /> <span>LEAST AFFECTED</span>
      </Indicator>
    </ColorContainer>
  );
};

export default ColorIndication;