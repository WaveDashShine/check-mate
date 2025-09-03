import React, { useEffect } from 'react';
import 'src/renderer/components/generic/Form.css';

export interface GenericFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isEdit: boolean;
}

interface FormProps extends GenericFormProps {
  title: string;
  fields: any;
  handleConfirm: (formData: any) => void;
  reset: () => void;
}

function Form(props: FormProps) {
  const handleCancel = () => {
    props.setIsOpen(false);
  };
  useEffect(() => {
    if (!props.isEdit) {
      props.reset();
    }
  }, [props.isEdit]);
  return (
    <div className="form-container">
      {props.isOpen && (
        <div>
          <div>
            <h2>{props.title}</h2>
            <div>{props.fields}</div>
            <div>
              <button
                className="confirm"
                type="submit"
                onClick={props.handleConfirm}
              >
                Confirm
              </button>
              <button className="cancel" onClick={() => handleCancel()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
