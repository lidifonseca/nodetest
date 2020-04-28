import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Pesquisa from './pesquisa';
import PesquisaDetail from './pesquisa-detail';
import PesquisaUpdate from './pesquisa-update';
import PesquisaDeleteDialog from './pesquisa-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PesquisaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PesquisaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PesquisaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Pesquisa} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PesquisaDeleteDialog} />
  </>
);

export default Routes;
