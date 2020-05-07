import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LicaoCasa from './licao-casa';
import LicaoCasaDetail from './licao-casa-detail';
import LicaoCasaRelatorioCSV from './relatorio/licao-casa.csv';
import LicaoCasaUpdate from './licao-casa-update';
import LicaoCasaDeleteDialog from './licao-casa-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={LicaoCasaRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LicaoCasaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LicaoCasaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LicaoCasaDetail} />
      <ErrorBoundaryRoute path={match.url} component={LicaoCasa} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LicaoCasaDeleteDialog} />
  </>
);

export default Routes;
