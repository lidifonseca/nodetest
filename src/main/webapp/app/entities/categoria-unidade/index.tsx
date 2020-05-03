import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CategoriaUnidade from './categoria-unidade';
import CategoriaUnidadeDetail from './categoria-unidade-detail';
import CategoriaUnidadeUpdate from './categoria-unidade-update';
import CategoriaUnidadeDeleteDialog from './categoria-unidade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CategoriaUnidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CategoriaUnidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CategoriaUnidadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={CategoriaUnidade} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CategoriaUnidadeDeleteDialog} />
  </>
);

export default Routes;
