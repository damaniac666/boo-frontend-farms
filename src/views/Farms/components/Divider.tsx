import styled from 'styled-components';

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  margin: 16px 0;
`;

export default Divider;