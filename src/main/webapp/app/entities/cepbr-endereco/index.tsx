import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CepbrEndereco from './cepbr-endereco';
import CepbrEnderecoDetail from './cepbr-endereco-detail';
import CepbrEnderecoUpdate from './cepbr-endereco-update';
import CepbrEnderecoDeleteDialog from './cepbr-endereco-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CepbrEnderecoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CepbrEnderecoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CepbrEnderecoDetail} />
      <ErrorBoundaryRoute path={match.url} component={CepbrEndereco} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CepbrEnderecoDeleteDialog} />
  </>
);

export default Routes;
