import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CategoriaAtividade from './categoria-atividade';
import CategoriaAtividadeDetail from './categoria-atividade-detail';
import CategoriaAtividadeUpdate from './categoria-atividade-update';
import CategoriaAtividadeDeleteDialog from './categoria-atividade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CategoriaAtividadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CategoriaAtividadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CategoriaAtividadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={CategoriaAtividade} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CategoriaAtividadeDeleteDialog} />
  </>
);

export default Routes;
