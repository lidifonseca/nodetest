import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApiInput from './api-input';
import ApiInputDetail from './api-input-detail';
import ApiInputUpdate from './api-input-update';
import ApiInputDeleteDialog from './api-input-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApiInputUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApiInputUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApiInputDetail} />
      <ErrorBoundaryRoute path={match.url} component={ApiInput} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ApiInputDeleteDialog} />
  </>
);

export default Routes;
