import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoUsuario from './tipo-usuario';
import TipoUsuarioDetail from './tipo-usuario-detail';
import TipoUsuarioUpdate from './tipo-usuario-update';
import TipoUsuarioDeleteDialog from './tipo-usuario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TipoUsuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TipoUsuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TipoUsuarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={TipoUsuario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TipoUsuarioDeleteDialog} />
  </>
);

export default Routes;
