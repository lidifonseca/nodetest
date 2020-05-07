import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CidPta from './cid-pta';
import CidPtaDetail from './cid-pta-detail';
import CidPtaRelatorioCSV from './relatorio/cid-pta.csv';
import CidPtaUpdate from './cid-pta-update';
import CidPtaDeleteDialog from './cid-pta-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={CidPtaRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CidPtaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CidPtaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CidPtaDetail} />
      <ErrorBoundaryRoute path={match.url} component={CidPta} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CidPtaDeleteDialog} />
  </>
);

export default Routes;
