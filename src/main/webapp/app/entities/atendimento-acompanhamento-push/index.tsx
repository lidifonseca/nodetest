import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AtendimentoAcompanhamentoPush from './atendimento-acompanhamento-push';
import AtendimentoAcompanhamentoPushDetail from './atendimento-acompanhamento-push-detail';
import AtendimentoAcompanhamentoPushRelatorioCSV from './relatorio/atendimento-acompanhamento-push.csv';
import AtendimentoAcompanhamentoPushUpdate from './atendimento-acompanhamento-push-update';
import AtendimentoAcompanhamentoPushDeleteDialog from './atendimento-acompanhamento-push-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={AtendimentoAcompanhamentoPushRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AtendimentoAcompanhamentoPushUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AtendimentoAcompanhamentoPushUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AtendimentoAcompanhamentoPushDetail} />
      <ErrorBoundaryRoute path={match.url} component={AtendimentoAcompanhamentoPush} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AtendimentoAcompanhamentoPushDeleteDialog} />
  </>
);

export default Routes;
