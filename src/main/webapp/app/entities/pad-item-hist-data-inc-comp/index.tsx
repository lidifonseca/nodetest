import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadItemHistDataIncComp from './pad-item-hist-data-inc-comp';
import PadItemHistDataIncCompDetail from './pad-item-hist-data-inc-comp-detail';
import PadItemHistDataIncCompRelatorioCSV from './relatorio/pad-item-hist-data-inc-comp.csv';
import PadItemHistDataIncCompUpdate from './pad-item-hist-data-inc-comp-update';
import PadItemHistDataIncCompDeleteDialog from './pad-item-hist-data-inc-comp-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PadItemHistDataIncCompRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadItemHistDataIncCompUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadItemHistDataIncCompUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadItemHistDataIncCompDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadItemHistDataIncComp} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadItemHistDataIncCompDeleteDialog} />
  </>
);

export default Routes;
