import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TokenUsuario from './token-usuario';
import TokenUsuarioDetail from './token-usuario-detail';
import TokenUsuarioUpdate from './token-usuario-update';
import TokenUsuarioDeleteDialog from './token-usuario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TokenUsuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TokenUsuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TokenUsuarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={TokenUsuario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TokenUsuarioDeleteDialog} />
  </>
);

export default Routes;
