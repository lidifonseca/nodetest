import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HistoricoClase from './historico-clase';
import HistoricoClaseDetail from './historico-clase-detail';
import HistoricoClaseUpdate from './historico-clase-update';
import HistoricoClaseDeleteDialog from './historico-clase-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HistoricoClaseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HistoricoClaseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HistoricoClaseDetail} />
      <ErrorBoundaryRoute path={match.url} component={HistoricoClase} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={HistoricoClaseDeleteDialog} />
  </>
);

export default Routes;
