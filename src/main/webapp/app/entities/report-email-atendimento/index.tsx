import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ReportEmailAtendimento from './report-email-atendimento';
import ReportEmailAtendimentoDetail from './report-email-atendimento-detail';
import ReportEmailAtendimentoRelatorioCSV from './relatorio/report-email-atendimento.csv';
import ReportEmailAtendimentoUpdate from './report-email-atendimento-update';
import ReportEmailAtendimentoDeleteDialog from './report-email-atendimento-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ReportEmailAtendimentoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReportEmailAtendimentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReportEmailAtendimentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReportEmailAtendimentoDetail} />
      <ErrorBoundaryRoute path={match.url} component={ReportEmailAtendimento} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ReportEmailAtendimentoDeleteDialog} />
  </>
);

export default Routes;
