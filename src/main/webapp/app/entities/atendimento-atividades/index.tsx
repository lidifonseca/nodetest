import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AtendimentoAtividades from './atendimento-atividades';
import AtendimentoAtividadesDetail from './atendimento-atividades-detail';
import AtendimentoAtividadesUpdate from './atendimento-atividades-update';
import AtendimentoAtividadesDeleteDialog from './atendimento-atividades-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AtendimentoAtividadesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AtendimentoAtividadesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AtendimentoAtividadesDetail} />
      <ErrorBoundaryRoute path={match.url} component={AtendimentoAtividades} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AtendimentoAtividadesDeleteDialog} />
  </>
);

export default Routes;
