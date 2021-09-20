import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ExportOutlineIcon from '../../assets/export.svg';
import { MenuList } from '../MenuList';
import { ActionCircle, ActionItem } from './Actions';

export const ExportButton: React.FC = ({ children }) => {
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
    <Export>
      <ActionCircle
        className="export-circle"
        onClick={() => setMenuShown(true)}
      >
        <ExportIcon />
      </ActionCircle>
      {isMenuShown && (
        <AnimateList
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'linear' }}
        >
          <AbsoluteMenuList>{children}</AbsoluteMenuList>
        </AnimateList>
      )}
    </Export>
  );
};

const Export = styled(ActionItem)`
  position: relative;

  &:hover {
    & > .heart-circle {
      background-color: rgba(249, 24, 128, 0.1);
    }

    & .heart-outline {
      fill: rgb(249, 24, 128);
    }

    & .like-count {
      color: rgb(249, 24, 128);
    }
  }
`;

const ExportIcon = styled(ExportOutlineIcon)`
  fill: rgb(110, 118, 125);
  width: 20px;
  height: 20px;
`;

const AnimateList = styled(motion.div)`
  z-index: 1;
`;
const AbsoluteMenuList = styled(MenuList)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  width: max-content;
  min-width: 230px;
  max-width: 274px;
`;
