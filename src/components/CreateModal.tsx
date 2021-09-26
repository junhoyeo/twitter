import firebase from 'firebase';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import styled, { css } from 'styled-components';

import { CreateTweetForm } from './CreateTweetForm';

type ModalProps = {
  isShown?: boolean;
  onDismiss?: () => void;
  user: firebase.User;
};
export const CreateModal: React.FC<ModalProps> = ({
  isShown,
  onDismiss,
  user,
}) => {
  return (
    <AnimatePresence>
      {isShown && (
        <Background
          className="create-modal-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring' }}
          onClick={(event) => {
            const targetElement = event.target as HTMLElement;
            if (
              targetElement.className?.includes?.('create-modal-background')
            ) {
              onDismiss();
            }
          }}
        >
          <Container
            initial={{ transform: 'translate3d(0, -350px, 0)' }}
            animate={{ transform: 'translate3d(0, 0px, 0)' }}
            exit={{ transform: 'translate3d(0, 350px, 0)' }}
            transition={{ type: 'spring' }}
          >
            <CreateTweetForm user={user} onSuccess={onDismiss} />
          </Container>
        </Background>
      )}
    </AnimatePresence>
  );
};
const Background = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  cursor: pointer;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(91, 112, 131, 0.4);
`;
const Container = styled(motion.div)`
  padding: 32px;
  max-height: 100%;
  max-width: 560px;
  width: 100%;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 1);
  cursor: default;

  @media (max-width: 900px) {
    max-width: 80vw;
  }
`;
const Title = styled.span`
  margin-bottom: 8px;
  line-height: 24px;
  min-width: 0;
  color: rgba(217, 217, 217, 1);

  text-align: left;
  font-size: 20px;
  font-weight: 700;
  overflow-wrap: break-word;
`;
const Description = styled.span`
  text-align: left;
  color: rgb(110, 118, 125);
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  overflow-wrap: break-word;
`;
const ButtonList = styled.div`
  margin-top: 24px;
  margin-right: calc(-12px);
  margin-bottom: calc(-12px);
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const buttonStyle = css`
  padding: 0 24px;
  margin-bottom: 12px;
  min-height: 44px;
  border: 1px solid;
  border-radius: 9999px;

  transition-duration: 0.2s;
  transition-property: background-color, box-shadow;

  overflow: hidden;
  flex-grow: 1;

  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
`;

const DeleteButton = styled.button`
  ${buttonStyle}

  border-color: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  background-color: rgb(244, 33, 46);
`;
const CancelButton = styled.button`
  ${buttonStyle}

  border-color: rgb(83, 100, 113);
  color: rgb(239, 243, 244);
  background-color: rgba(0, 0, 0, 0);
`;
