import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Profissional from './profissional';
import ProfissionalDetail from './profissional-detail';
import ProfissionalUpdate from './profissional-update';
import ProfissionalDeleteDialog from './profissional-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalDetail} />
      <ErrorBoundaryRoute path={match.url} component={Profissional} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalDeleteDialog} />
  </>
);

export default Routes;
