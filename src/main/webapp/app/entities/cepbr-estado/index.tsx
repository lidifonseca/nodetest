import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CepbrEstado from './cepbr-estado';
import CepbrEstadoDetail from './cepbr-estado-detail';
import CepbrEstadoRelatorioCSV from './relatorio/cepbr-estado.csv';
import CepbrEstadoUpdate from './cepbr-estado-update';
import CepbrEstadoDeleteDialog from './cepbr-estado-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={CepbrEstadoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CepbrEstadoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CepbrEstadoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CepbrEstadoDetail} />
      <ErrorBoundaryRoute path={match.url} component={CepbrEstado} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CepbrEstadoDeleteDialog} />
  </>
);

export default Routes;
