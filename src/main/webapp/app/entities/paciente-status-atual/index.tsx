import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteStatusAtual from './paciente-status-atual';
import PacienteStatusAtualDetail from './paciente-status-atual-detail';
import PacienteStatusAtualRelatorioCSV from './relatorio/paciente-status-atual.csv';
import PacienteStatusAtualUpdate from './paciente-status-atual-update';
import PacienteStatusAtualDeleteDialog from './paciente-status-atual-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PacienteStatusAtualRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteStatusAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteStatusAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteStatusAtualDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteStatusAtual} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteStatusAtualDeleteDialog} />
  </>
);

export default Routes;
