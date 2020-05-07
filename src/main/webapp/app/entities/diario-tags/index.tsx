import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DiarioTags from './diario-tags';
import DiarioTagsDetail from './diario-tags-detail';
import DiarioTagsRelatorioCSV from './relatorio/diario-tags.csv';
import DiarioTagsUpdate from './diario-tags-update';
import DiarioTagsDeleteDialog from './diario-tags-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={DiarioTagsRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DiarioTagsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DiarioTagsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DiarioTagsDetail} />
      <ErrorBoundaryRoute path={match.url} component={DiarioTags} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DiarioTagsDeleteDialog} />
  </>
);

export default Routes;
