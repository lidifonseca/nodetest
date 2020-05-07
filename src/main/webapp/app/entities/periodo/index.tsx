import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Periodo from './periodo';
import PeriodoDetail from './periodo-detail';
import PeriodoRelatorioCSV from './relatorio/periodo.csv';
import PeriodoUpdate from './periodo-update';
import PeriodoDeleteDialog from './periodo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PeriodoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PeriodoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PeriodoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PeriodoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Periodo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PeriodoDeleteDialog} />
  </>
);

export default Routes;
