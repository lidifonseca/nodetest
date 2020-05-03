import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPacienteCaracteristicaAtual } from 'app/shared/model/paciente-caracteristica-atual.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './paciente-caracteristica-atual.reducer';

export interface IPacienteCaracteristicaAtualDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteCaracteristicaAtualDeleteDialog extends React.Component<IPacienteCaracteristicaAtualDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.pacienteCaracteristicaAtualEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { pacienteCaracteristicaAtualEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.pacienteCaracteristicaAtual.delete.question">
          <Translate
            contentKey="generadorApp.pacienteCaracteristicaAtual.delete.question"
            interpolate={{ id: pacienteCaracteristicaAtualEntity.id }}
          >
            Are you sure you want to delete this PacienteCaracteristicaAtual?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-pacienteCaracteristicaAtual" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ pacienteCaracteristicaAtual }: IRootState) => ({
  pacienteCaracteristicaAtualEntity: pacienteCaracteristicaAtual.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteCaracteristicaAtualDeleteDialog);
