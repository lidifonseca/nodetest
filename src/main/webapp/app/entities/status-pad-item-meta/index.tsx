import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StatusPadItemMeta from './status-pad-item-meta';
import StatusPadItemMetaDetail from './status-pad-item-meta-detail';
import StatusPadItemMetaRelatorioCSV from './relatorio/status-pad-item-meta.csv';
import StatusPadItemMetaUpdate from './status-pad-item-meta-update';
import StatusPadItemMetaDeleteDialog from './status-pad-item-meta-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={StatusPadItemMetaRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StatusPadItemMetaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StatusPadItemMetaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StatusPadItemMetaDetail} />
      <ErrorBoundaryRoute path={match.url} component={StatusPadItemMeta} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StatusPadItemMetaDeleteDialog} />
  </>
);

export default Routes;
