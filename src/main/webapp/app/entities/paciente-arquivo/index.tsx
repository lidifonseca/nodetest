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
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PacienteArquivoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteArquivoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteArquivoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteArquivoDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteArquivo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteArquivoDeleteDialog} />
  </>
);

export default Routes;
