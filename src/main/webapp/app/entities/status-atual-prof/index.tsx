import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StatusAtualProf from './status-atual-prof';
import StatusAtualProfDetail from './status-atual-prof-detail';
import StatusAtualProfUpdate from './status-atual-prof-update';
import StatusAtualProfDeleteDialog from './status-atual-prof-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StatusAtualProfUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StatusAtualProfUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StatusAtualProfDetail} />
      <ErrorBoundaryRoute path={match.url} component={StatusAtualProf} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StatusAtualProfDeleteDialog} />
  </>
);

export default Routes;
