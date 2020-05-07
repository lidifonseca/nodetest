import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AtendimentoStatusFinanceiro from './atendimento-status-financeiro';
import AtendimentoStatusFinanceiroDetail from './atendimento-status-financeiro-detail';
import AtendimentoStatusFinanceiroRelatorioCSV from './relatorio/atendimento-status-financeiro.csv';
import AtendimentoStatusFinanceiroUpdate from './atendimento-status-financeiro-update';
import AtendimentoStatusFinanceiroDeleteDialog from './atendimento-status-financeiro-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={AtendimentoStatusFinanceiroRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AtendimentoStatusFinanceiroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AtendimentoStatusFinanceiroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AtendimentoStatusFinanceiroDetail} />
      <ErrorBoundaryRoute path={match.url} component={AtendimentoStatusFinanceiro} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AtendimentoStatusFinanceiroDeleteDialog} />
  </>
);

export default Routes;
