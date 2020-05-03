import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadItem from './pad-item';
import PadItemDetail from './pad-item-detail';
import PadItemUpdate from './pad-item-update';
import PadItemDeleteDialog from './pad-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadItem} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadItemDeleteDialog} />
  </>
);

export default Routes;
