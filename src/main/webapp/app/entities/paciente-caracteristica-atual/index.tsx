import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteCaracteristicaAtual from './paciente-caracteristica-atual';
import PacienteCaracteristicaAtualDetail from './paciente-caracteristica-atual-detail';
import PacienteCaracteristicaAtualUpdate from './paciente-caracteristica-atual-update';
import PacienteCaracteristicaAtualDeleteDialog from './paciente-caracteristica-atual-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteCaracteristicaAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteCaracteristicaAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteCaracteristicaAtualDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteCaracteristicaAtual} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteCaracteristicaAtualDeleteDialog} />
  </>
);

export default Routes;
