import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Audiencia from './audiencia';
import AudienciaDetail from './audiencia-detail';
import AudienciaUpdate from './audiencia-update';
import AudienciaDeleteDialog from './audiencia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AudienciaDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AudienciaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AudienciaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AudienciaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Audiencia} />
    </Switch>
  </>
);

export default Routes;
