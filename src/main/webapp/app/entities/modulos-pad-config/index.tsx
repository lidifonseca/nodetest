import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ModulosPadConfig from './modulos-pad-config';
import ModulosPadConfigDetail from './modulos-pad-config-detail';
import ModulosPadConfigRelatorioCSV from './relatorio/modulos-pad-config.csv';
import ModulosPadConfigUpdate from './modulos-pad-config-update';
import ModulosPadConfigDeleteDialog from './modulos-pad-config-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ModulosPadConfigRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ModulosPadConfigUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ModulosPadConfigUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ModulosPadConfigDetail} />
      <ErrorBoundaryRoute path={match.url} component={ModulosPadConfig} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ModulosPadConfigDeleteDialog} />
  </>
);

export default Routes;
