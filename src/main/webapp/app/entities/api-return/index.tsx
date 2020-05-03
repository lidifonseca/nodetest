import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApiReturn from './api-return';
import ApiReturnDetail from './api-return-detail';
import ApiReturnUpdate from './api-return-update';
import ApiReturnDeleteDialog from './api-return-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApiReturnUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApiReturnUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApiReturnDetail} />
      <ErrorBoundaryRoute path={match.url} component={ApiReturn} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ApiReturnDeleteDialog} />
  </>
);

export default Routes;
