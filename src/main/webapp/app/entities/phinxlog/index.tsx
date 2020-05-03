import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Phinxlog from './phinxlog';
import PhinxlogDetail from './phinxlog-detail';
import PhinxlogUpdate from './phinxlog-update';
import PhinxlogDeleteDialog from './phinxlog-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PhinxlogUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PhinxlogUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PhinxlogDetail} />
      <ErrorBoundaryRoute path={match.url} component={Phinxlog} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PhinxlogDeleteDialog} />
  </>
);

export default Routes;
