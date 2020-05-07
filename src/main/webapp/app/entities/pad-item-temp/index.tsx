import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadItemTemp from './pad-item-temp';
import PadItemTempDetail from './pad-item-temp-detail';
import PadItemTempRelatorioCSV from './relatorio/pad-item-temp.csv';
import PadItemTempUpdate from './pad-item-temp-update';
import PadItemTempDeleteDialog from './pad-item-temp-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PadItemTempRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadItemTempUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadItemTempUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadItemTempDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadItemTemp} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadItemTempDeleteDialog} />
  </>
);

export default Routes;
