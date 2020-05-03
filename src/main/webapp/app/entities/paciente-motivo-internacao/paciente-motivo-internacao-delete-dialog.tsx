import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPacienteMotivoInternacao } from 'app/shared/model/paciente-motivo-internacao.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './paciente-motivo-internacao.reducer';

export interface IPacienteMotivoInternacaoDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteMotivoInternacaoDeleteDialog extends React.Component<IPacienteMotivoInternacaoDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.pacienteMotivoInternacaoEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { pacienteMotivoInternacaoEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.pacienteMotivoInternacao.delete.question">
          <Translate
            contentKey="generadorApp.pacienteMotivoInternacao.delete.question"
            interpolate={{ id: pacienteMotivoInternacaoEntity.id }}
          >
            Are you sure you want to delete this PacienteMotivoInternacao?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-pacienteMotivoInternacao" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ pacienteMotivoInternacao }: IRootState) => ({
  pacienteMotivoInternacaoEntity: pacienteMotivoInternacao.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteMotivoInternacaoDeleteDialog);
