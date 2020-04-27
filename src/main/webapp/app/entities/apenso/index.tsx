import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Apenso from './apenso';
import ApensoDetail from './apenso-detail';
import ApensoUpdate from './apenso-update';
import ApensoDeleteDialog from './apenso-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ApensoDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApensoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApensoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApensoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Apenso} />
    </Switch>
  </>
);

export default Routes;
