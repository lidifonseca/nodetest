import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UsuarioStatusAtual from './usuario-status-atual';
import UsuarioStatusAtualDetail from './usuario-status-atual-detail';
import UsuarioStatusAtualUpdate from './usuario-status-atual-update';
import UsuarioStatusAtualDeleteDialog from './usuario-status-atual-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UsuarioStatusAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UsuarioStatusAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UsuarioStatusAtualDetail} />
      <ErrorBoundaryRoute path={match.url} component={UsuarioStatusAtual} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UsuarioStatusAtualDeleteDialog} />
  </>
);

export default Routes;
