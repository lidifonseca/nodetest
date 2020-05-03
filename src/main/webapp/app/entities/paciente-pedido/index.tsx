import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacientePedido from './paciente-pedido';
import PacientePedidoDetail from './paciente-pedido-detail';
import PacientePedidoUpdate from './paciente-pedido-update';
import PacientePedidoDeleteDialog from './paciente-pedido-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacientePedidoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacientePedidoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacientePedidoDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacientePedido} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacientePedidoDeleteDialog} />
  </>
);

export default Routes;
