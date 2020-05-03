import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CidXPtaNovoPadItemIndi from './cid-x-pta-novo-pad-item-indi';
import CidXPtaNovoPadItemIndiDetail from './cid-x-pta-novo-pad-item-indi-detail';
import CidXPtaNovoPadItemIndiUpdate from './cid-x-pta-novo-pad-item-indi-update';
import CidXPtaNovoPadItemIndiDeleteDialog from './cid-x-pta-novo-pad-item-indi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CidXPtaNovoPadItemIndiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CidXPtaNovoPadItemIndiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CidXPtaNovoPadItemIndiDetail} />
      <ErrorBoundaryRoute path={match.url} component={CidXPtaNovoPadItemIndi} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CidXPtaNovoPadItemIndiDeleteDialog} />
  </>
);

export default Routes;
