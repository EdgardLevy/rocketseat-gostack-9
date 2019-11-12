import React from 'react';

import { Container, Spinner, SpinnerLigth } from './styles';

export default function Loading(props) {
  return (
    <Container>
      <Spinner size={props.size} />
    </Container>
  );
}

export function LoadingLight(props) {
  return (
    <Container>
      <SpinnerLigth size={props.size} />
    </Container>
  );
}
