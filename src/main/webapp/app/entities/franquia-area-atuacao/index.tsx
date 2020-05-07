import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FranquiaAreaAtuacao from './franquia-area-atuacao';
import FranquiaAreaAtuacaoDetail from './franquia-area-atuacao-detail';
import FranquiaAreaAtuacaoRelatorioCSV from './relatorio/franquia-area-atuacao.csv';
import FranquiaAreaAtuacaoUpdate from './franquia-area-atuacao-update';
import FranquiaAreaAtuacaoDeleteDialog from './franquia-area-atuacao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={FranquiaAreaAtuacaoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FranquiaAreaAtuacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FranquiaAreaAtuacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FranquiaAreaAtuacaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={FranquiaAreaAtuacao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FranquiaAreaAtuacaoDeleteDialog} />
  </>
);

export default Routes;
