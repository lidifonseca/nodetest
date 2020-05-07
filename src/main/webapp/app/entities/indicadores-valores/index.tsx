import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import IndicadoresValores from './indicadores-valores';
import IndicadoresValoresDetail from './indicadores-valores-detail';
import IndicadoresValoresRelatorioCSV from './relatorio/indicadores-valores.csv';
import IndicadoresValoresUpdate from './indicadores-valores-update';
import IndicadoresValoresDeleteDialog from './indicadores-valores-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={IndicadoresValoresRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IndicadoresValoresUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IndicadoresValoresUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IndicadoresValoresDetail} />
      <ErrorBoundaryRoute path={match.url} component={IndicadoresValores} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={IndicadoresValoresDeleteDialog} />
  </>
);

export default Routes;
