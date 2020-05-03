import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UsuarioPanico from './usuario-panico';
import UsuarioPanicoDetail from './usuario-panico-detail';
import UsuarioPanicoUpdate from './usuario-panico-update';
import UsuarioPanicoDeleteDialog from './usuario-panico-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UsuarioPanicoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UsuarioPanicoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UsuarioPanicoDetail} />
      <ErrorBoundaryRoute path={match.url} component={UsuarioPanico} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UsuarioPanicoDeleteDialog} />
  </>
);

export default Routes;
