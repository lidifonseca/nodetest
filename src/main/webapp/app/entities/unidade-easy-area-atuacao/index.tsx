import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UnidadeEasyAreaAtuacao from './unidade-easy-area-atuacao';
import UnidadeEasyAreaAtuacaoDetail from './unidade-easy-area-atuacao-detail';
import UnidadeEasyAreaAtuacaoUpdate from './unidade-easy-area-atuacao-update';
import UnidadeEasyAreaAtuacaoDeleteDialog from './unidade-easy-area-atuacao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UnidadeEasyAreaAtuacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UnidadeEasyAreaAtuacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UnidadeEasyAreaAtuacaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={UnidadeEasyAreaAtuacao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UnidadeEasyAreaAtuacaoDeleteDialog} />
  </>
);

export default Routes;
