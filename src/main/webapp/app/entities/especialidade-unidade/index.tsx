import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EspecialidadeUnidade from './especialidade-unidade';
import EspecialidadeUnidadeDetail from './especialidade-unidade-detail';
import EspecialidadeUnidadeUpdate from './especialidade-unidade-update';
import EspecialidadeUnidadeDeleteDialog from './especialidade-unidade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EspecialidadeUnidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EspecialidadeUnidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EspecialidadeUnidadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={EspecialidadeUnidade} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EspecialidadeUnidadeDeleteDialog} />
  </>
);

export default Routes;
