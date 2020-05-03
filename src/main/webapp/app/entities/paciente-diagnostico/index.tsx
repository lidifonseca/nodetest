import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteDiagnostico from './paciente-diagnostico';
import PacienteDiagnosticoDetail from './paciente-diagnostico-detail';
import PacienteDiagnosticoUpdate from './paciente-diagnostico-update';
import PacienteDiagnosticoDeleteDialog from './paciente-diagnostico-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteDiagnosticoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteDiagnosticoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteDiagnosticoDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteDiagnostico} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteDiagnosticoDeleteDialog} />
  </>
);

export default Routes;
