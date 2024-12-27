import React from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => (theme === 'dark' ? '#2C3E50' : '#d6eaf8')};
  color: ${({ theme }) => (theme === 'dark' ? '#ECF0F1' : '#2C3E50')};
  border-radius: 10px;
  padding: 20px;
  width: 50%;
  max-width: 400px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  overflow: auto;
  border: 4px solid ${({ theme }) => (theme === 'dark' ? '#76baff' : '#0056b3')};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  color: ${({ theme }) => (theme === 'dark' ? '#ECF0F1' : '#fff')};
  cursor: pointer;
`;

const ThreatModal = ({ isOpen, onClose, theme = 'light', data }) => {
  if (!isOpen || !data) return null;
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h1>{data.threat_name}</h1>
        <p><strong>COUNT:</strong> {data.count}</p>
        <p><strong>PERCENTAGE:</strong> {data.percentage.toFixed(2)}%</p>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default ThreatModal;
