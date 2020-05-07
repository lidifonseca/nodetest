import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalArquivo from './profissional-arquivo';
import ProfissionalArquivoDetail from './profissional-arquivo-detail';
import ProfissionalArquivoRelatorioCSV from './relatorio/profissional-arquivo.csv';
import ProfissionalArquivoUpdate from './profissional-arquivo-update';
import ProfissionalArquivoDeleteDialog from './profissional-arquivo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ProfissionalArquivoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalArquivoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalArquivoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalArquivoDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalArquivo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalArquivoDeleteDialog} />
  </>
);

export default Routes;
