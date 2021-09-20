import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled, { css } from 'styled-components';

type ModalProps = {
  title: string;
  description: string;
  buttons: {
    title: string;
    onClick: () => void;
    destructive?: boolean;
  }[];
  isShown?: boolean;
  onDismiss?: () => void;
};
export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  buttons,
  isShown,
  onDismiss,
}) => {
  const withoutPropagation =
    (callback: () => void) => (e: React.MouseEvent) => {
      e.stopPropagation();
      callback();
    };

  return (
    <AnimatePresence>
      {isShown && (
        <Background
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring' }}
          onClick={onDismiss}
        >
          <Container
            initial={{ transform: 'translate3d(0, -350px, 0)' }}
            animate={{ transform: 'translate3d(0, 0px, 0)' }}
            exit={{ transform: 'translate3d(0, 350px, 0)' }}
            transition={{ type: 'spring' }}
          >
            <Title>{title}</Title>
            <Description>{description}</Description>
            <ButtonList>
              {buttons.map(({ title, onClick, destructive }) =>
                !destructive ? (
                  <CancelButton
                    key={title}
                    onClick={withoutPropagation(onClick)}
                  >
                    {title}
                  </CancelButton>
                ) : (
                  <DeleteButton
                    key={title}
                    onClick={withoutPropagation(onClick)}
                  >
                    {title}
                  </DeleteButton>
                ),
              )}
            </ButtonList>
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
  max-width: 320px;
  width: 100%;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 1);
  cursor: default;
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
