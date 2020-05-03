import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadPta from './pad-pta';
import PadPtaDetail from './pad-pta-detail';
import PadPtaUpdate from './pad-pta-update';
import PadPtaDeleteDialog from './pad-pta-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadPtaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadPtaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadPtaDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadPta} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadPtaDeleteDialog} />
  </>
);

export default Routes;
