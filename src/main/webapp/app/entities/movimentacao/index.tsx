import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Movimentacao from './movimentacao';
import MovimentacaoDetail from './movimentacao-detail';
import MovimentacaoUpdate from './movimentacao-update';
import MovimentacaoDeleteDialog from './movimentacao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MovimentacaoDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MovimentacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MovimentacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MovimentacaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Movimentacao} />
    </Switch>
  </>
);

export default Routes;
