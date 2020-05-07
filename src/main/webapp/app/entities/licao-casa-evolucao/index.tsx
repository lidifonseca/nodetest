import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LicaoCasaEvolucao from './licao-casa-evolucao';
import LicaoCasaEvolucaoDetail from './licao-casa-evolucao-detail';
import LicaoCasaEvolucaoRelatorioCSV from './relatorio/licao-casa-evolucao.csv';
import LicaoCasaEvolucaoUpdate from './licao-casa-evolucao-update';
import LicaoCasaEvolucaoDeleteDialog from './licao-casa-evolucao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={LicaoCasaEvolucaoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LicaoCasaEvolucaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LicaoCasaEvolucaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LicaoCasaEvolucaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={LicaoCasaEvolucao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LicaoCasaEvolucaoDeleteDialog} />
  </>
);

export default Routes;
