import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from './ThemeContext';
import Modal from './Modal';

 const BoxContainer = styled.div`
  border: 2px solid #3478f6;  
  margin-bottom: 20px;
  padding: 5px;
   background-color: ${({ theme }) => theme === 'dark' ? '#000' : '#fff'};  
  transition: background-color 0.3s, box-shadow 0.3s;
 
  &:hover {
    background-color:${({ theme }) => theme === 'dark' ? '#1a2f40' : '#e3f2fd'}; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }
`;
 
const Title = styled.h3`
  border-bottom: 2.5px solid burlywood;  
  padding-bottom: 9px;
  color:${({ theme }) => theme === 'dark' ? 'white' : 'black'}; 
  text-align: center;
  font-size: 1em;
`;
 
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 1px;
  color: ${({ theme }) => theme === 'dark' ? 'white' : 'black'};  
  cursor: pointer;
  `;
 
  const ColorIndicator = styled.span`
  height: 11px;
  width: 11px;
  background-color: ${props => props.color};
  border-radius: 50%;
  display: inline-block;
  margin-right: 11px;
`;

const Flag = styled.img`
  width: 20px;  
  height: 15px;  
  object-fit: cover;  
  margin-right: 10px;  
  vertical-align: middle;  
`;

const ModalHeader = styled.h2`
  font-size: 20px;
  align-items: center;  
  color: #000;
  margin-bottom: 10px; 
  `;
  const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
  const preventionDetails = {
    PHISHING: {
      title: "PHISHING PREVENTION",
      content: [
        "Never provide personal financial information.",
        "Use advanced email filters.",
        "Regularly update security policies and procedures."
      ]
    },
    DDOS: {
      title: "DDoS PREVENTION",
      content: [
        "Overprovision bandwidth to handle unexpected traffic spikes.",
        "Utilize DDoS mitigation tools effectively.",
        "Monitor traffic consistently to detect anomalies early."
      ]
    },
    MALWARE: {
      title: "MALWARE PREVENTION",
      content: [
        "Use updated antivirus software across all devices.",
        "Regularly apply security patches and updates.",
        "Conduct frequent security audits and vulnerability assessments."
      ]
    }
  };
 
const StatBox = ({ title, items }) => {
  const { theme } = useContext(ThemeContext);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const handleItemClick = item => {
    setSelectedItem(preventionDetails[item.name]);
  };
  const defaultIcon = '/default.jpg';
  return (
 <BoxContainer theme={theme}>
  <Title theme={theme}>{title}</Title>
      {items.map((item, index) => (
<ListItem key={index} theme={theme} onClick={() => handleItemClick(item)}>
   {item.color && title !== "TARGETED NATIONS" && <ColorIndicator color={item.color} />}
   <Icon src={item.icon || defaultIcon} alt={`${item.name}`} />
          {item.flag && <Flag src={item.flag} alt={`${item.name} flag`} />}
<span>{item.name || 'Unknown'}</span> 
</ListItem>
      ))}
     <Modal isOpen={selectedItem !== null} onClose={() => setSelectedItem(null)}  position="left">
      <ModalHeader theme={theme}>{selectedItem ? selectedItem.title : ''}</ModalHeader>
        <ul>
          {selectedItem ? selectedItem.content.map((point, idx) => (
            <li key={idx}>{point}</li>
          )) : null}
        </ul>
      </Modal>
</BoxContainer>
  );
};
 
export default StatBox;