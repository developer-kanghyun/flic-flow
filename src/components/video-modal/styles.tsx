import { styled } from "styled-components";

export const StyledVideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
`;

export const ModalContent = styled.div`
  position: relative;
  width: 90vw;
  max-width: 1200px;
  height: 80vh;
  max-height: 700px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 95vw;
    height: 70vh;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 98vw;
    height: 60vh;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border: none;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
`;