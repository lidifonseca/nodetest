import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteOperadora from './paciente-operadora';
import PacienteOperadoraDetail from './paciente-operadora-detail';
import PacienteOperadoraUpdate from './paciente-operadora-update';
import PacienteOperadoraDeleteDialog from './paciente-operadora-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteOperadoraUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteOperadoraUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteOperadoraDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteOperadora} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteOperadoraDeleteDialog} />
  </>
);

export default Routes;
