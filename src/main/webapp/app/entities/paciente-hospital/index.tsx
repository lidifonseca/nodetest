import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteHospital from './paciente-hospital';
import PacienteHospitalDetail from './paciente-hospital-detail';
import PacienteHospitalRelatorioCSV from './relatorio/paciente-hospital.csv';
import PacienteHospitalUpdate from './paciente-hospital-update';
import PacienteHospitalDeleteDialog from './paciente-hospital-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PacienteHospitalRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteHospitalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteHospitalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteHospitalDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteHospital} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteHospitalDeleteDialog} />
  </>
);

export default Routes;
