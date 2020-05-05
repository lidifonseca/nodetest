import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CategoriaContrato from './categoria-contrato';
import CategoriaContratoDetail from './categoria-contrato-detail';
import CategoriaContratoRelatorioCSV from './relatorio/categoria-contrato.csv';
import CategoriaContratoUpdate from './categoria-contrato-update';
import CategoriaContratoDeleteDialog from './categoria-contrato-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={CategoriaContratoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CategoriaContratoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CategoriaContratoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CategoriaContratoDetail} />
      <ErrorBoundaryRoute path={match.url} component={CategoriaContrato} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CategoriaContratoDeleteDialog} />
  </>
);

export default Routes;
