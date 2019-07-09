import styled, { css } from 'styled-components';
import { rotate } from '../../styles/global';

export const Form = styled.form`
  /* Garante que o botão e o form fiquem sempre um ao lado do outro e não embaixo */
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  /* Faz com que o input ocupe todo o espaço possível da flexbox */
  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    /* Aplica nos LI exceto o primeiro */
    & + li {
      border-top: 1px solid #eee;
    }
  }

  a {
    color: #7159c1;
    text-decoration: none;
  }
`;
