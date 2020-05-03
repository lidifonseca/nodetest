import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadMatMed from './pad-mat-med';
import PadMatMedDetail from './pad-mat-med-detail';
import PadMatMedUpdate from './pad-mat-med-update';
import PadMatMedDeleteDialog from './pad-mat-med-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadMatMedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadMatMedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadMatMedDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadMatMed} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadMatMedDeleteDialog} />
  </>
);

export default Routes;
