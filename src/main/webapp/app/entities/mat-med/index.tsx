import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MatMed from './mat-med';
import MatMedDetail from './mat-med-detail';
import MatMedUpdate from './mat-med-update';
import MatMedDeleteDialog from './mat-med-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MatMedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MatMedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MatMedDetail} />
      <ErrorBoundaryRoute path={match.url} component={MatMed} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MatMedDeleteDialog} />
  </>
);

export default Routes;
