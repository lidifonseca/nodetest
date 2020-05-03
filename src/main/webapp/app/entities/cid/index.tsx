import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Cid from './cid';
import CidDetail from './cid-detail';
import CidUpdate from './cid-update';
import CidDeleteDialog from './cid-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CidUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CidUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CidDetail} />
      <ErrorBoundaryRoute path={match.url} component={Cid} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CidDeleteDialog} />
  </>
);

export default Routes;
