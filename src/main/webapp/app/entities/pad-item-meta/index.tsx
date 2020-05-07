import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadItemMeta from './pad-item-meta';
import PadItemMetaDetail from './pad-item-meta-detail';
import PadItemMetaRelatorioCSV from './relatorio/pad-item-meta.csv';
import PadItemMetaUpdate from './pad-item-meta-update';
import PadItemMetaDeleteDialog from './pad-item-meta-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PadItemMetaRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadItemMetaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadItemMetaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadItemMetaDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadItemMeta} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadItemMetaDeleteDialog} />
  </>
);

export default Routes;
