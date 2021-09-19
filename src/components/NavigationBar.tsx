import styled from 'styled-components';

type NavigationBarProps = {
  title?: string;
  children?: React.ReactNode;
};

export const NavigationBar: React.FC<NavigationBarProps> = ({
  title,
  children,
}) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
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
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: rgba(217, 217, 217, 1);
`;
