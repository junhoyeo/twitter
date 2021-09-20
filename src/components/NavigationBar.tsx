import styled from 'styled-components';

type NavigationBarProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export const NavigationBar: React.FC<NavigationBarProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <Container>
      {(!!title || !!subtitle) && (
        <Header>
          {title && <Title>{title}</Title>}
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Header>
      )}
      {children}
    </Container>
  );
};

const Container = styled.div`
  height: 53px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(47, 51, 54);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: rgba(217, 217, 217, 1);
`;
const Subtitle = styled.span`
  font-size: 13px;
  line-height: 16px;
  color: rgb(110, 118, 125);
`;
