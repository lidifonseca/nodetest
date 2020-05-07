import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoPreferenciaAtendimento from './tipo-preferencia-atendimento';
import TipoPreferenciaAtendimentoDetail from './tipo-preferencia-atendimento-detail';
import TipoPreferenciaAtendimentoRelatorioCSV from './relatorio/tipo-preferencia-atendimento.csv';
import TipoPreferenciaAtendimentoUpdate from './tipo-preferencia-atendimento-update';
import TipoPreferenciaAtendimentoDeleteDialog from './tipo-preferencia-atendimento-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={TipoPreferenciaAtendimentoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TipoPreferenciaAtendimentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TipoPreferenciaAtendimentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TipoPreferenciaAtendimentoDetail} />
      <ErrorBoundaryRoute path={match.url} component={TipoPreferenciaAtendimento} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TipoPreferenciaAtendimentoDeleteDialog} />
  </>
);

export default Routes;
