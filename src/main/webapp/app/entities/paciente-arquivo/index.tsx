import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteArquivo from './paciente-arquivo';
import PacienteArquivoDetail from './paciente-arquivo-detail';
import PacienteArquivoRelatorioCSV from './relatorio/paciente-arquivo.csv';
import PacienteArquivoUpdate from './paciente-arquivo-update';
import PacienteArquivoDeleteDialog from './paciente-arquivo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.path}/relatorio/csv`} component={PacienteArquivoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.path}/new`} component={PacienteArquivoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.path}/:id/edit`} component={PacienteArquivoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.path}/:id`} component={PacienteArquivoDetail} />
      <ErrorBoundaryRoute path={match.path} component={PacienteArquivo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.path}/:id/delete`} component={PacienteArquivoDeleteDialog} />
  </>
);

export default Routes;
