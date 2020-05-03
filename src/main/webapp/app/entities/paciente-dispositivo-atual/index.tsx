import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteDispositivoAtual from './paciente-dispositivo-atual';
import PacienteDispositivoAtualDetail from './paciente-dispositivo-atual-detail';
import PacienteDispositivoAtualUpdate from './paciente-dispositivo-atual-update';
import PacienteDispositivoAtualDeleteDialog from './paciente-dispositivo-atual-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteDispositivoAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteDispositivoAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteDispositivoAtualDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteDispositivoAtual} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteDispositivoAtualDeleteDialog} />
  </>
);

export default Routes;
