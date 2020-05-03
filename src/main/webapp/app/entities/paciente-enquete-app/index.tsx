import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteEnqueteApp from './paciente-enquete-app';
import PacienteEnqueteAppDetail from './paciente-enquete-app-detail';
import PacienteEnqueteAppUpdate from './paciente-enquete-app-update';
import PacienteEnqueteAppDeleteDialog from './paciente-enquete-app-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteEnqueteAppUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteEnqueteAppUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteEnqueteAppDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteEnqueteApp} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteEnqueteAppDeleteDialog} />
  </>
);

export default Routes;
