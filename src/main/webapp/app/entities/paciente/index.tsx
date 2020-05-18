import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Paciente from './paciente';
import PacienteDetail from './paciente-detail';
import PacienteRelatorioCSV from './relatorio/paciente.csv';
import PacienteUpdate from './paciente-update';
import PacienteDeleteDialog from './paciente-delete-dialog';

import PacienteArquivo from '../paciente-arquivo/index';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.path}/relatorio/csv`} component={PacienteRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.path}/new`} component={PacienteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.path}/:id/edit`} component={PacienteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.path}/:id`} component={PacienteDetail} />
      <ErrorBoundaryRoute path={match.path} component={Paciente} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.path}/:id/delete`} component={PacienteDeleteDialog} />

    <Switch>
      <ErrorBoundaryRoute path={`${match.path}/:idPaciente/paciente-arquivo`} component={PacienteArquivo} />
    </Switch>
  </>
);

export default Routes;
