import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MotivoPs from './motivo-ps';
import MotivoPsDetail from './motivo-ps-detail';
import MotivoPsUpdate from './motivo-ps-update';
import MotivoPsDeleteDialog from './motivo-ps-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MotivoPsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MotivoPsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MotivoPsDetail} />
      <ErrorBoundaryRoute path={match.url} component={MotivoPs} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MotivoPsDeleteDialog} />
  </>
);

export default Routes;
