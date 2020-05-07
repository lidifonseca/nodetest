import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteDadosCartao from './paciente-dados-cartao';
import PacienteDadosCartaoDetail from './paciente-dados-cartao-detail';
import PacienteDadosCartaoRelatorioCSV from './relatorio/paciente-dados-cartao.csv';
import PacienteDadosCartaoUpdate from './paciente-dados-cartao-update';
import PacienteDadosCartaoDeleteDialog from './paciente-dados-cartao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PacienteDadosCartaoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteDadosCartaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteDadosCartaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteDadosCartaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteDadosCartao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteDadosCartaoDeleteDialog} />
  </>
);

export default Routes;
