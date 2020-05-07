import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Pad from './pad';
import PadDetail from './pad-detail';
import PadRelatorioCSV from './relatorio/pad.csv';
import PadUpdate from './pad-update';
import PadDeleteDialog from './pad-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PadRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadDetail} />
      <ErrorBoundaryRoute path={match.url} component={Pad} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadDeleteDialog} />
  </>
);

export default Routes;
