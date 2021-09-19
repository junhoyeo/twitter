import styled from 'styled-components';

import { onMobile } from '../utils/relatives';

type MenuListProps = React.HTMLAttributes<HTMLUListElement> & {
  children: React.ReactNode;
};

export const MenuList: React.FC<MenuListProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

const Container = styled.ul`
  margin: 0;
  padding: 0;
  width: 384px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;

  position: absolute;
  background-color: rgba(0, 0, 0, 1);
  box-shadow: rgb(255 255 255 / 20%) 0px 0px 15px,
    rgb(255 255 255 / 15%) 0px 0px 3px 1px;

  ${onMobile} {
    width: 280px;
  }
`;
