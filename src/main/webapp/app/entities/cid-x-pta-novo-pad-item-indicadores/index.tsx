import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CidXPtaNovoPadItemIndicadores from './cid-x-pta-novo-pad-item-indicadores';
import CidXPtaNovoPadItemIndicadoresDetail from './cid-x-pta-novo-pad-item-indicadores-detail';
import CidXPtaNovoPadItemIndicadoresUpdate from './cid-x-pta-novo-pad-item-indicadores-update';
import CidXPtaNovoPadItemIndicadoresDeleteDialog from './cid-x-pta-novo-pad-item-indicadores-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CidXPtaNovoPadItemIndicadoresUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CidXPtaNovoPadItemIndicadoresUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CidXPtaNovoPadItemIndicadoresDetail} />
      <ErrorBoundaryRoute path={match.url} component={CidXPtaNovoPadItemIndicadores} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CidXPtaNovoPadItemIndicadoresDeleteDialog} />
  </>
);

export default Routes;
