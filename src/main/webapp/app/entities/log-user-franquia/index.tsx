import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LogUserFranquia from './log-user-franquia';
import LogUserFranquiaDetail from './log-user-franquia-detail';
import LogUserFranquiaUpdate from './log-user-franquia-update';
import LogUserFranquiaDeleteDialog from './log-user-franquia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LogUserFranquiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LogUserFranquiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LogUserFranquiaDetail} />
      <ErrorBoundaryRoute path={match.url} component={LogUserFranquia} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LogUserFranquiaDeleteDialog} />
  </>
);

export default Routes;
