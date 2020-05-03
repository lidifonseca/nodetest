import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPacienteDispositivoComplexidade } from 'app/shared/model/paciente-dispositivo-complexidade.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './paciente-dispositivo-complexidade.reducer';

export interface IPacienteDispositivoComplexidadeDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDispositivoComplexidadeDeleteDialog extends React.Component<IPacienteDispositivoComplexidadeDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.pacienteDispositivoComplexidadeEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { pacienteDispositivoComplexidadeEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.pacienteDispositivoComplexidade.delete.question">
          <Translate
            contentKey="generadorApp.pacienteDispositivoComplexidade.delete.question"
            interpolate={{ id: pacienteDispositivoComplexidadeEntity.id }}
          >
            Are you sure you want to delete this PacienteDispositivoComplexidade?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-pacienteDispositivoComplexidade" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ pacienteDispositivoComplexidade }: IRootState) => ({
  pacienteDispositivoComplexidadeEntity: pacienteDispositivoComplexidade.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDispositivoComplexidadeDeleteDialog);
