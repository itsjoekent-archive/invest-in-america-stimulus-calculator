import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from './assets/logo.svg';

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  position: absolute;
  top: 24px;

  a {
    cursor: pointer;
  }
`;

export default function Nav(props) {
  return (
    <Container>
      <a href="http://investinamericanow.com/">
        <Logo />
      </a>
    </Container>
  );
}
