import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteServico from './paciente-servico';
import PacienteServicoDetail from './paciente-servico-detail';
import PacienteServicoRelatorioCSV from './relatorio/paciente-servico.csv';
import PacienteServicoUpdate from './paciente-servico-update';
import PacienteServicoDeleteDialog from './paciente-servico-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PacienteServicoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteServicoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteServicoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteServicoDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteServico} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteServicoDeleteDialog} />
  </>
);

export default Routes;
