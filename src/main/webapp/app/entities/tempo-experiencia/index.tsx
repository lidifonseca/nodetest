import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TempoExperiencia from './tempo-experiencia';
import TempoExperienciaDetail from './tempo-experiencia-detail';
import TempoExperienciaRelatorioCSV from './relatorio/tempo-experiencia.csv';
import TempoExperienciaUpdate from './tempo-experiencia-update';
import TempoExperienciaDeleteDialog from './tempo-experiencia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={TempoExperienciaRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TempoExperienciaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TempoExperienciaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TempoExperienciaDetail} />
      <ErrorBoundaryRoute path={match.url} component={TempoExperiencia} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TempoExperienciaDeleteDialog} />
  </>
);

export default Routes;
