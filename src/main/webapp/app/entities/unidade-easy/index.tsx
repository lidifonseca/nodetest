import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UnidadeEasy from './unidade-easy';
import UnidadeEasyDetail from './unidade-easy-detail';
import UnidadeEasyUpdate from './unidade-easy-update';
import UnidadeEasyDeleteDialog from './unidade-easy-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UnidadeEasyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UnidadeEasyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UnidadeEasyDetail} />
      <ErrorBoundaryRoute path={match.url} component={UnidadeEasy} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UnidadeEasyDeleteDialog} />
  </>
);

export default Routes;
