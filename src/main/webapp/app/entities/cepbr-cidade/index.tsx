import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CepbrCidade from './cepbr-cidade';
import CepbrCidadeDetail from './cepbr-cidade-detail';
import CepbrCidadeRelatorioCSV from './relatorio/cepbr-cidade.csv';
import CepbrCidadeUpdate from './cepbr-cidade-update';
import CepbrCidadeDeleteDialog from './cepbr-cidade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={CepbrCidadeRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CepbrCidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CepbrCidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CepbrCidadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={CepbrCidade} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CepbrCidadeDeleteDialog} />
  </>
);

export default Routes;
