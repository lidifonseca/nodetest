import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AtendimentoAssinaturas from './atendimento-assinaturas';
import AtendimentoAssinaturasDetail from './atendimento-assinaturas-detail';
import AtendimentoAssinaturasUpdate from './atendimento-assinaturas-update';
import AtendimentoAssinaturasDeleteDialog from './atendimento-assinaturas-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AtendimentoAssinaturasUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AtendimentoAssinaturasUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AtendimentoAssinaturasDetail} />
      <ErrorBoundaryRoute path={match.url} component={AtendimentoAssinaturas} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AtendimentoAssinaturasDeleteDialog} />
  </>
);

export default Routes;
