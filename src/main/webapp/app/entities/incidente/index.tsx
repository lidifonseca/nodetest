import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Incidente from './incidente';
import IncidenteDetail from './incidente-detail';
import IncidenteUpdate from './incidente-update';
import IncidenteDeleteDialog from './incidente-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={IncidenteDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IncidenteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IncidenteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IncidenteDetail} />
      <ErrorBoundaryRoute path={match.url} component={Incidente} />
    </Switch>
  </>
);

export default Routes;
