import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalAreaAtuacaoNew from './profissional-area-atuacao-new';
import ProfissionalAreaAtuacaoNewDetail from './profissional-area-atuacao-new-detail';
import ProfissionalAreaAtuacaoNewUpdate from './profissional-area-atuacao-new-update';
import ProfissionalAreaAtuacaoNewDeleteDialog from './profissional-area-atuacao-new-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalAreaAtuacaoNewUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalAreaAtuacaoNewUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalAreaAtuacaoNewDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalAreaAtuacaoNew} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalAreaAtuacaoNewDeleteDialog} />
  </>
);

export default Routes;
