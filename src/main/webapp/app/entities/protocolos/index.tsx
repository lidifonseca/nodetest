import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Protocolos from './protocolos';
import ProtocolosDetail from './protocolos-detail';
import ProtocolosRelatorioCSV from './relatorio/protocolos.csv';
import ProtocolosUpdate from './protocolos-update';
import ProtocolosDeleteDialog from './protocolos-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ProtocolosRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProtocolosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProtocolosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProtocolosDetail} />
      <ErrorBoundaryRoute path={match.url} component={Protocolos} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProtocolosDeleteDialog} />
  </>
);

export default Routes;
