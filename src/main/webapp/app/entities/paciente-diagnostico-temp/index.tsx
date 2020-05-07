import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteDiagnosticoTemp from './paciente-diagnostico-temp';
import PacienteDiagnosticoTempDetail from './paciente-diagnostico-temp-detail';
import PacienteDiagnosticoTempRelatorioCSV from './relatorio/paciente-diagnostico-temp.csv';
import PacienteDiagnosticoTempUpdate from './paciente-diagnostico-temp-update';
import PacienteDiagnosticoTempDeleteDialog from './paciente-diagnostico-temp-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PacienteDiagnosticoTempRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteDiagnosticoTempUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteDiagnosticoTempUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteDiagnosticoTempDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteDiagnosticoTemp} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteDiagnosticoTempDeleteDialog} />
  </>
);

export default Routes;
