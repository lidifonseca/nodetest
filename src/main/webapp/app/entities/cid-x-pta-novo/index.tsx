import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CidXPtaNovo from './cid-x-pta-novo';
import CidXPtaNovoDetail from './cid-x-pta-novo-detail';
import CidXPtaNovoRelatorioCSV from './relatorio/cid-x-pta-novo.csv';
import CidXPtaNovoUpdate from './cid-x-pta-novo-update';
import CidXPtaNovoDeleteDialog from './cid-x-pta-novo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={CidXPtaNovoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CidXPtaNovoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CidXPtaNovoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CidXPtaNovoDetail} />
      <ErrorBoundaryRoute path={match.url} component={CidXPtaNovo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CidXPtaNovoDeleteDialog} />
  </>
);

export default Routes;
