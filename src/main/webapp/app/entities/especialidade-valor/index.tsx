import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EspecialidadeValor from './especialidade-valor';
import EspecialidadeValorDetail from './especialidade-valor-detail';
import EspecialidadeValorUpdate from './especialidade-valor-update';
import EspecialidadeValorDeleteDialog from './especialidade-valor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EspecialidadeValorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EspecialidadeValorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EspecialidadeValorDetail} />
      <ErrorBoundaryRoute path={match.url} component={EspecialidadeValor} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EspecialidadeValorDeleteDialog} />
  </>
);

export default Routes;
