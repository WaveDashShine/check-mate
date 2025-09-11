import React, { useEffect } from 'react';

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
                className="confirm bg-green-500 cursor-pointer rounded-xl"
                type="submit"
                onClick={props.handleConfirm}
              >
                Confirm
              </button>
              <button
                className="cancel bg-red-500 cursor-pointer rounded-xl"
                onClick={() => handleCancel()}
              >
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
