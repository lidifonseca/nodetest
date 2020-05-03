import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UnidadeMedida from './unidade-medida';
import UnidadeMedidaDetail from './unidade-medida-detail';
import UnidadeMedidaUpdate from './unidade-medida-update';
import UnidadeMedidaDeleteDialog from './unidade-medida-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UnidadeMedidaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UnidadeMedidaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UnidadeMedidaDetail} />
      <ErrorBoundaryRoute path={match.url} component={UnidadeMedida} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UnidadeMedidaDeleteDialog} />
  </>
);

export default Routes;
