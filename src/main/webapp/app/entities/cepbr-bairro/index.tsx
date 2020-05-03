import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CepbrBairro from './cepbr-bairro';
import CepbrBairroDetail from './cepbr-bairro-detail';
import CepbrBairroUpdate from './cepbr-bairro-update';
import CepbrBairroDeleteDialog from './cepbr-bairro-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CepbrBairroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CepbrBairroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CepbrBairroDetail} />
      <ErrorBoundaryRoute path={match.url} component={CepbrBairro} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CepbrBairroDeleteDialog} />
  </>
);

export default Routes;
