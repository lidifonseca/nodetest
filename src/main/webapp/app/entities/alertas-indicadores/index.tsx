import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AlertasIndicadores from './alertas-indicadores';
import AlertasIndicadoresDetail from './alertas-indicadores-detail';
import AlertasIndicadoresUpdate from './alertas-indicadores-update';
import AlertasIndicadoresDeleteDialog from './alertas-indicadores-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AlertasIndicadoresUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AlertasIndicadoresUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AlertasIndicadoresDetail} />
      <ErrorBoundaryRoute path={match.url} component={AlertasIndicadores} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AlertasIndicadoresDeleteDialog} />
  </>
);

export default Routes;
