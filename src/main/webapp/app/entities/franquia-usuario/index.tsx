import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FranquiaUsuario from './franquia-usuario';
import FranquiaUsuarioDetail from './franquia-usuario-detail';
import FranquiaUsuarioUpdate from './franquia-usuario-update';
import FranquiaUsuarioDeleteDialog from './franquia-usuario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FranquiaUsuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FranquiaUsuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FranquiaUsuarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={FranquiaUsuario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FranquiaUsuarioDeleteDialog} />
  </>
);

export default Routes;
