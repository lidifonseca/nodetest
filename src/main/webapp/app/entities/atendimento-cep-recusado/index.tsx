import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AtendimentoCepRecusado from './atendimento-cep-recusado';
import AtendimentoCepRecusadoDetail from './atendimento-cep-recusado-detail';
import AtendimentoCepRecusadoRelatorioCSV from './relatorio/atendimento-cep-recusado.csv';
import AtendimentoCepRecusadoUpdate from './atendimento-cep-recusado-update';
import AtendimentoCepRecusadoDeleteDialog from './atendimento-cep-recusado-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={AtendimentoCepRecusadoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AtendimentoCepRecusadoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AtendimentoCepRecusadoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AtendimentoCepRecusadoDetail} />
      <ErrorBoundaryRoute path={match.url} component={AtendimentoCepRecusado} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AtendimentoCepRecusadoDeleteDialog} />
  </>
);

export default Routes;
