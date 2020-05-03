import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalStatusAtualNew from './profissional-status-atual-new';
import ProfissionalStatusAtualNewDetail from './profissional-status-atual-new-detail';
import ProfissionalStatusAtualNewUpdate from './profissional-status-atual-new-update';
import ProfissionalStatusAtualNewDeleteDialog from './profissional-status-atual-new-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalStatusAtualNewUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalStatusAtualNewUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalStatusAtualNewDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalStatusAtualNew} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalStatusAtualNewDeleteDialog} />
  </>
);

export default Routes;
