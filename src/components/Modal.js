import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 115%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  background-color: rgba(0,0,0,0.4);
  align-items: flex-start;
  animation: ${fadeIn} 0.3s;
`;

const ModalContent = styled.div`
  background: #ddfcf7; 
  color: ${({ theme }) => theme === 'dark' ? '#abb2bf' : '#333'};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  width: auto;
  max-width: 255px;
  position: fixed;
  top: 21%;
  left: 73%;
  transform: translateX(-50%);
  z-index: 9999;
  display: block;
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  animation: ${fadeIn} 0.2s;
  border: 3.5px solid ${({ theme }) => theme === 'dark' ? '#76baff' : '#0056b3'};  
  font-size: 17.2px; 
  font-weight: bold; 
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  color: #707070;
  font-size: 28px;
  cursor: pointer;
`;

const Modal = ({ isOpen, children, onClose, theme = 'light' }) => { 
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent theme={theme} onClick={e => e.stopPropagation()}>
        {children}
        <CloseButton onClick={e => { e.stopPropagation(); onClose(); }}>&times;</CloseButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;