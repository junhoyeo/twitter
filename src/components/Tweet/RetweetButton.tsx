import styled from 'styled-components';

import RetweetIcon from '../../assets/retweet-light.svg';
import { ActionCircle, ActionItem } from './Actions';

export const RetweetButton = ({ onClick }) => {
  return (
    <Retweet>
      <ActionCircle className="retweet-circle" onClick={onClick}>
        <ExportIcon />
      </ActionCircle>
    </Retweet>
  );
};

const Retweet = styled(ActionItem)`
  position: relative;

  &:hover {
    & > .retweet-circle {
      background-color: rgba(0, 186, 124, 0.1);
    }

    & svg {
      fill: rgb(0, 186, 124);
    }
  }
`;

const ExportIcon = styled(RetweetIcon)`
  fill: rgb(110, 118, 125);
  width: 20px;
  height: 20px;
`;
