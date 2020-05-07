import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteMotivoInternacao from './paciente-motivo-internacao';
import PacienteMotivoInternacaoDetail from './paciente-motivo-internacao-detail';
import PacienteMotivoInternacaoRelatorioCSV from './relatorio/paciente-motivo-internacao.csv';
import PacienteMotivoInternacaoUpdate from './paciente-motivo-internacao-update';
import PacienteMotivoInternacaoDeleteDialog from './paciente-motivo-internacao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PacienteMotivoInternacaoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteMotivoInternacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteMotivoInternacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteMotivoInternacaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteMotivoInternacao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteMotivoInternacaoDeleteDialog} />
  </>
);

export default Routes;
