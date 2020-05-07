import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AcoesRespostas from './acoes-respostas';
import AcoesRespostasDetail from './acoes-respostas-detail';
import AcoesRespostasRelatorioCSV from './relatorio/acoes-respostas.csv';
import AcoesRespostasUpdate from './acoes-respostas-update';
import AcoesRespostasDeleteDialog from './acoes-respostas-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={AcoesRespostasRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AcoesRespostasUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AcoesRespostasUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AcoesRespostasDetail} />
      <ErrorBoundaryRoute path={match.url} component={AcoesRespostas} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AcoesRespostasDeleteDialog} />
  </>
);

export default Routes;
