import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalAreaAtuacao from './profissional-area-atuacao';
import ProfissionalAreaAtuacaoDetail from './profissional-area-atuacao-detail';
import ProfissionalAreaAtuacaoUpdate from './profissional-area-atuacao-update';
import ProfissionalAreaAtuacaoDeleteDialog from './profissional-area-atuacao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalAreaAtuacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalAreaAtuacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalAreaAtuacaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalAreaAtuacao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalAreaAtuacaoDeleteDialog} />
  </>
);

export default Routes;
