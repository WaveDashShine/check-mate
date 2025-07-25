import React from 'react';
import 'src/renderer/components/Form.css';

export interface GenericFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isEdit?: boolean;
}

interface FormProps extends GenericFormProps {
  title: string;
  fields: any;
  handleConfirm: (formData: any) => void;
}

function Form(props: FormProps) {
  const handleCancel = () => {
    props.setIsOpen(false);
  };
  return (
    <form onSubmit={props.handleConfirm}>
      {props.isOpen && (
        <div>
          <div>
            <h2>{props.title}</h2>
            <div>{props.fields}</div>
            <div>
              <button className="confirm" type="submit">
                Confirm
              </button>
              <button className="cancel" onClick={() => handleCancel()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default Form;
