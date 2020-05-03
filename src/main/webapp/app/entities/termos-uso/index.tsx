import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TermosUso from './termos-uso';
import TermosUsoDetail from './termos-uso-detail';
import TermosUsoUpdate from './termos-uso-update';
import TermosUsoDeleteDialog from './termos-uso-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TermosUsoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TermosUsoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TermosUsoDetail} />
      <ErrorBoundaryRoute path={match.url} component={TermosUso} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TermosUsoDeleteDialog} />
  </>
);

export default Routes;
