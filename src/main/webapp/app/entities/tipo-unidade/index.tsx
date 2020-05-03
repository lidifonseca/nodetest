import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoUnidade from './tipo-unidade';
import TipoUnidadeDetail from './tipo-unidade-detail';
import TipoUnidadeUpdate from './tipo-unidade-update';
import TipoUnidadeDeleteDialog from './tipo-unidade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TipoUnidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TipoUnidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TipoUnidadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={TipoUnidade} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TipoUnidadeDeleteDialog} />
  </>
);

export default Routes;
