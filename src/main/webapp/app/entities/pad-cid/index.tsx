import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadCid from './pad-cid';
import PadCidDetail from './pad-cid-detail';
import PadCidRelatorioCSV from './relatorio/pad-cid.csv';
import PadCidUpdate from './pad-cid-update';
import PadCidDeleteDialog from './pad-cid-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PadCidRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadCidUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadCidUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadCidDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadCid} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadCidDeleteDialog} />
  </>
);

export default Routes;
