import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Parte from './parte';
import ParteDetail from './parte-detail';
import ParteUpdate from './parte-update';
import ParteDeleteDialog from './parte-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ParteDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ParteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ParteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ParteDetail} />
      <ErrorBoundaryRoute path={match.url} component={Parte} />
    </Switch>
  </>
);

export default Routes;
