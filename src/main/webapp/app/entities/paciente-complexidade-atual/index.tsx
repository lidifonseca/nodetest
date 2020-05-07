import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteComplexidadeAtual from './paciente-complexidade-atual';
import PacienteComplexidadeAtualDetail from './paciente-complexidade-atual-detail';
import PacienteComplexidadeAtualRelatorioCSV from './relatorio/paciente-complexidade-atual.csv';
import PacienteComplexidadeAtualUpdate from './paciente-complexidade-atual-update';
import PacienteComplexidadeAtualDeleteDialog from './paciente-complexidade-atual-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PacienteComplexidadeAtualRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteComplexidadeAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteComplexidadeAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteComplexidadeAtualDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteComplexidadeAtual} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteComplexidadeAtualDeleteDialog} />
  </>
);

export default Routes;
