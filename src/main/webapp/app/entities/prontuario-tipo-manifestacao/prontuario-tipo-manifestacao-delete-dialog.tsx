import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IProntuarioTipoManifestacao } from 'app/shared/model/prontuario-tipo-manifestacao.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './prontuario-tipo-manifestacao.reducer';

export interface IProntuarioTipoManifestacaoDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProntuarioTipoManifestacaoDeleteDialog extends React.Component<IProntuarioTipoManifestacaoDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.prontuarioTipoManifestacaoEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { prontuarioTipoManifestacaoEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.prontuarioTipoManifestacao.delete.question">
          <Translate
            contentKey="generadorApp.prontuarioTipoManifestacao.delete.question"
            interpolate={{ id: prontuarioTipoManifestacaoEntity.id }}
          >
            Are you sure you want to delete this ProntuarioTipoManifestacao?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-prontuarioTipoManifestacao" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ prontuarioTipoManifestacao }: IRootState) => ({
  prontuarioTipoManifestacaoEntity: prontuarioTipoManifestacao.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioTipoManifestacaoDeleteDialog);
