import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteDiarioTags from './paciente-diario-tags';
import PacienteDiarioTagsDetail from './paciente-diario-tags-detail';
import PacienteDiarioTagsUpdate from './paciente-diario-tags-update';
import PacienteDiarioTagsDeleteDialog from './paciente-diario-tags-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteDiarioTagsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteDiarioTagsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteDiarioTagsDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteDiarioTags} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteDiarioTagsDeleteDialog} />
  </>
);

export default Routes;
