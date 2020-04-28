import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Processo from './processo';
import ProcessoDetail from './processo-detail';
import ProcessoUpdate from './processo-update';
import ProcessoDeleteDialog from './processo-delete-dialog';
import PageNotFound from "app/shared/error/page-not-found";

const Routes = ({ match }) => (
  <>
    <Switch>
      {/* <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProcessoUpdate} /> */}
      {/* <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProcessoUpdate} /> */}
      <ErrorBoundaryRoute exact path={`${match.url}/:estado/pesquisa/:pesquisa`} component={Processo} />
      <ErrorBoundaryRoute exact path={`${match.url}/:estado/pesquisa/:pesquisa/:id`} component={ProcessoDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/:estado/:id`} component={ProcessoDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/:estado`} component={Processo} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProcessoDeleteDialog} />
  </>
);

export default Routes;
