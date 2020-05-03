import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApiName from './api-name';
import ApiNameDetail from './api-name-detail';
import ApiNameUpdate from './api-name-update';
import ApiNameDeleteDialog from './api-name-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApiNameUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApiNameUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApiNameDetail} />
      <ErrorBoundaryRoute path={match.url} component={ApiName} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ApiNameDeleteDialog} />
  </>
);

export default Routes;
