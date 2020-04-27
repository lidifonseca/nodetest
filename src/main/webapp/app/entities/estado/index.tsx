import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Estado from './estado';
import EstadoDetail from './estado-detail';
import EstadoUpdate from './estado-update';
import EstadoDeleteDialog from './estado-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EstadoDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EstadoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EstadoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EstadoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Estado} />
    </Switch>
  </>
);

export default Routes;
