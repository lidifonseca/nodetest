import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteDispositivoComplexidade from './paciente-dispositivo-complexidade';
import PacienteDispositivoComplexidadeDetail from './paciente-dispositivo-complexidade-detail';
import PacienteDispositivoComplexidadeRelatorioCSV from './relatorio/paciente-dispositivo-complexidade.csv';
import PacienteDispositivoComplexidadeUpdate from './paciente-dispositivo-complexidade-update';
import PacienteDispositivoComplexidadeDeleteDialog from './paciente-dispositivo-complexidade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PacienteDispositivoComplexidadeRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteDispositivoComplexidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteDispositivoComplexidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteDispositivoComplexidadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteDispositivoComplexidade} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteDispositivoComplexidadeDeleteDialog} />
  </>
);

export default Routes;
