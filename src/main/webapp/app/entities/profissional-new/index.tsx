import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalNew from './profissional-new';
import ProfissionalNewDetail from './profissional-new-detail';
import ProfissionalNewUpdate from './profissional-new-update';
import ProfissionalNewDeleteDialog from './profissional-new-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalNewUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalNewUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalNewDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalNew} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalNewDeleteDialog} />
  </>
);

export default Routes;
