import styled from 'styled-components';

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const PaginationButton = styled.button.attrs(props => ({
  disabled: props.page === 1,
}))`
  color: #7159c1;
  background: transparent;
  border: 0;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
