import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import MoreIcon from '../../assets/more.svg';
import { MenuList } from '../MenuList';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const MoreButton: React.FC<Props> = ({ children, ...props }) => {
  const [isMenuShown, setMenuShown] = useState<boolean>(false);

  useEffect(() => {
    if (!isMenuShown) {
      return;
    }
    const handleClick = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      if (clickedElement.className?.includes?.('menu-item')) {
        return;
      }
      setMenuShown(false);
    };

    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('touchstart', handleClick, { passive: true });

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [isMenuShown]);

  return (
    <RelativeContainer {...props}>
      <Circle isMenuShown={isMenuShown} onClick={() => setMenuShown(true)}>
        <BlueMore />
      </Circle>
      {isMenuShown && (
        <AnimateList
          initial={{ opacity: 0, transform: 'translate3d(0, 64px, 0)' }}
          animate={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
          exit={{ opacity: 0, transform: 'translate3d(0, -100px, 0)' }}
          transition={{ ease: 'linear' }}
        >
          <AbsoluteMenuList>{children}</AbsoluteMenuList>
        </AnimateList>
      )}
    </RelativeContainer>
  );
};

const RelativeContainer = styled.div`
  width: 18.75px;
  height: 18.75px;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type CircleProps = {
  isMenuShown: boolean;
};
const Circle = styled.button<CircleProps>`
  width: 34.75px;
  height: 34.75px;
  border-radius: 50%;

  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  background-color: transparent;

  ${({ isMenuShown }) =>
    !isMenuShown &&
    css`
      &:hover {
        background-color: rgba(29, 155, 240, 0.1);
      }
    `};
`;
const BlueMore = styled(MoreIcon)`
  fill: rgb(110, 118, 125);
  width: 18.75px;
  height: 18.75px;

  &:hover {
    fill: rgb(29, 155, 240);
  }
`;

const AnimateList = styled(motion.div)`
  z-index: 1;
  position: relative;
`;
const AbsoluteMenuList = styled(MenuList)`
  position: absolute;
  top: -8px;
  right: -12px;
  z-index: 999;
`;
