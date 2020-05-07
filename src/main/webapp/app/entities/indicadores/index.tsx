import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Indicadores from './indicadores';
import IndicadoresDetail from './indicadores-detail';
import IndicadoresRelatorioCSV from './relatorio/indicadores.csv';
import IndicadoresUpdate from './indicadores-update';
import IndicadoresDeleteDialog from './indicadores-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={IndicadoresRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IndicadoresUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IndicadoresUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IndicadoresDetail} />
      <ErrorBoundaryRoute path={match.url} component={Indicadores} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={IndicadoresDeleteDialog} />
  </>
);

export default Routes;
