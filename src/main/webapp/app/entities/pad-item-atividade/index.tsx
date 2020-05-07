import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadItemAtividade from './pad-item-atividade';
import PadItemAtividadeDetail from './pad-item-atividade-detail';
import PadItemAtividadeRelatorioCSV from './relatorio/pad-item-atividade.csv';
import PadItemAtividadeUpdate from './pad-item-atividade-update';
import PadItemAtividadeDeleteDialog from './pad-item-atividade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PadItemAtividadeRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadItemAtividadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadItemAtividadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadItemAtividadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadItemAtividade} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadItemAtividadeDeleteDialog} />
  </>
);

export default Routes;
