import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadItemIndicadores from './pad-item-indicadores';
import PadItemIndicadoresDetail from './pad-item-indicadores-detail';
import PadItemIndicadoresRelatorioCSV from './relatorio/pad-item-indicadores.csv';
import PadItemIndicadoresUpdate from './pad-item-indicadores-update';
import PadItemIndicadoresDeleteDialog from './pad-item-indicadores-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PadItemIndicadoresRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadItemIndicadoresUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadItemIndicadoresUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadItemIndicadoresDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadItemIndicadores} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadItemIndicadoresDeleteDialog} />
  </>
);

export default Routes;
