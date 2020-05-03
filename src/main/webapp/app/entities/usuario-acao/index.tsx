import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UsuarioAcao from './usuario-acao';
import UsuarioAcaoDetail from './usuario-acao-detail';
import UsuarioAcaoUpdate from './usuario-acao-update';
import UsuarioAcaoDeleteDialog from './usuario-acao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UsuarioAcaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UsuarioAcaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UsuarioAcaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={UsuarioAcao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UsuarioAcaoDeleteDialog} />
  </>
);

export default Routes;
