import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Julho from './julho';
import JulhoDetail from './julho-detail';
import JulhoUpdate from './julho-update';
import JulhoDeleteDialog from './julho-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JulhoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JulhoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JulhoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Julho} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={JulhoDeleteDialog} />
  </>
);

export default Routes;
