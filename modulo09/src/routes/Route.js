import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

export default function RouterWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const signed = false;
  // se o usuario n estiver logado e a rota for privada
  // entao redireciona para a login
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }
  // se o usuario ta logado e a rota nao eh privada
  // entao redireciona para o dashboard
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }
  const Layout = signed ? DefaultLayout : AuthLayout;
  // se n tiver nenhum redirecionamento entao acessa a rota desejada
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}
// tipo da propriedade
RouterWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  // componente pode ser uma classe ou uma funcao
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};
// valor padrao da propriedade
RouterWrapper.defaultProps = {
  isPrivate: false,
};
