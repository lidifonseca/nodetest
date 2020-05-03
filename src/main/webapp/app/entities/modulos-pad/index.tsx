import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ModulosPad from './modulos-pad';
import ModulosPadDetail from './modulos-pad-detail';
import ModulosPadUpdate from './modulos-pad-update';
import ModulosPadDeleteDialog from './modulos-pad-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ModulosPadUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ModulosPadUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ModulosPadDetail} />
      <ErrorBoundaryRoute path={match.url} component={ModulosPad} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ModulosPadDeleteDialog} />
  </>
);

export default Routes;
