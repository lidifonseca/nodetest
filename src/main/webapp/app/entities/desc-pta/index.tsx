import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DescPta from './desc-pta';
import DescPtaDetail from './desc-pta-detail';
import DescPtaUpdate from './desc-pta-update';
import DescPtaDeleteDialog from './desc-pta-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DescPtaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DescPtaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DescPtaDetail} />
      <ErrorBoundaryRoute path={match.url} component={DescPta} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DescPtaDeleteDialog} />
  </>
);

export default Routes;
