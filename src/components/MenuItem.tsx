import styled from 'styled-components';

type DestructiveProps = {
  destructive?: boolean;
};
type MenuItemProps = DestructiveProps & {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
};

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  destructive,
  onClick,
}) => {
  return (
    <Container
      className="menu-item"
      onClick={onClick}
      destructive={destructive}
    >
      {icon}
      <Title destructive={destructive}>{title}</Title>
    </Container>
  );
};

const Container = styled.li<DestructiveProps>`
  padding: 16px;
  list-style-type: none;
  align-items: center;
  display: flex;
  cursor: pointer;

  & > svg {
    width: 18.75px;
    height: 18.75px;

    fill: ${({ destructive }) =>
      !destructive ? 'rgb(110, 118, 125)' : 'rgb(244, 33, 46)'};
  }
`;
const Title = styled.span<DestructiveProps>`
  margin-left: 12px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: ${({ destructive }) =>
    !destructive ? '#d9d9d9' : 'rgb(244, 33, 46)'};
`;
