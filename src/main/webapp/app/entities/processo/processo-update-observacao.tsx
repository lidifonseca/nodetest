import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, UncontrolledTooltip} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AvForm, AvInput} from 'availity-reactstrap-validation';


const ModalObservacao = (props) => {
  const {
  } = props;


  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <span>
      <Button onClick={toggle} color="warning" size="sm" id={"edit-"+ props.processoId}>
        <FontAwesomeIcon icon="pencil-alt"/>{' '}
        <span className="d-md-inline">
            <span className="d-none d-md-inline"></span>
         </span>
      </Button>
      <UncontrolledTooltip placement="top" target={"edit-" + props.processoId}>
                          Editar observação do processo
                        </UncontrolledTooltip>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className={"modal-header-dark"}>Inserir Observação do processo</ModalHeader>
        <AvForm className="" onSubmit={props.insertObservacao} model={''}>
          <ModalBody>
            <AvInput id="processo-observacao" type="textarea" name="observacao" value={props.value}/>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={toggle} type="submit" >Salvar</Button>{' '}
            <Button color="dark" onClick={toggle}>Cancelar</Button>
          </ModalFooter>
        </AvForm>

      </Modal>
    </span>
  );
}

export default ModalObservacao;
