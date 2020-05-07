import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteGrauParentesco from './paciente-grau-parentesco';
import PacienteGrauParentescoDetail from './paciente-grau-parentesco-detail';
import PacienteGrauParentescoRelatorioCSV from './relatorio/paciente-grau-parentesco.csv';
import PacienteGrauParentescoUpdate from './paciente-grau-parentesco-update';
import PacienteGrauParentescoDeleteDialog from './paciente-grau-parentesco-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PacienteGrauParentescoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteGrauParentescoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteGrauParentescoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteGrauParentescoDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteGrauParentesco} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteGrauParentescoDeleteDialog} />
  </>
);

export default Routes;
