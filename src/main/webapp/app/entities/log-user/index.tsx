import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LogUser from './log-user';
import LogUserDetail from './log-user-detail';
import LogUserUpdate from './log-user-update';
import LogUserDeleteDialog from './log-user-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LogUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LogUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LogUserDetail} />
      <ErrorBoundaryRoute path={match.url} component={LogUser} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LogUserDeleteDialog} />
  </>
);

export default Routes;
