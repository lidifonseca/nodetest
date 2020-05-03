import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IProfissionalDispositivoComplexidadeAtual } from 'app/shared/model/profissional-dispositivo-complexidade-atual.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './profissional-dispositivo-complexidade-atual.reducer';

export interface IProfissionalDispositivoComplexidadeAtualDeleteDialogProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ id: string }> {}

export class ProfissionalDispositivoComplexidadeAtualDeleteDialog extends React.Component<
  IProfissionalDispositivoComplexidadeAtualDeleteDialogProps
> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.profissionalDispositivoComplexidadeAtualEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { profissionalDispositivoComplexidadeAtualEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.profissionalDispositivoComplexidadeAtual.delete.question">
          <Translate
            contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.delete.question"
            interpolate={{ id: profissionalDispositivoComplexidadeAtualEntity.id }}
          >
            Are you sure you want to delete this ProfissionalDispositivoComplexidadeAtual?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-profissionalDispositivoComplexidadeAtual" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ profissionalDispositivoComplexidadeAtual }: IRootState) => ({
  profissionalDispositivoComplexidadeAtualEntity: profissionalDispositivoComplexidadeAtual.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalDispositivoComplexidadeAtualDeleteDialog);
