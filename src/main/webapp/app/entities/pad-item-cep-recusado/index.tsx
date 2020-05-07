import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadItemCepRecusado from './pad-item-cep-recusado';
import PadItemCepRecusadoDetail from './pad-item-cep-recusado-detail';
import PadItemCepRecusadoRelatorioCSV from './relatorio/pad-item-cep-recusado.csv';
import PadItemCepRecusadoUpdate from './pad-item-cep-recusado-update';
import PadItemCepRecusadoDeleteDialog from './pad-item-cep-recusado-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PadItemCepRecusadoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadItemCepRecusadoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadItemCepRecusadoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadItemCepRecusadoDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadItemCepRecusado} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadItemCepRecusadoDeleteDialog} />
  </>
);

export default Routes;
