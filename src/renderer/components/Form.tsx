import React from 'react';

export interface BaseFormProps {
  isOpen: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}

interface FormProps extends BaseFormProps {
  title: string;
  fields: any;
}

function Form(props: FormProps) {
  return (
    <div>
      {props.isOpen && (
        <div>
          <div>
            <h2>{props.title}</h2>
            <div>{props.fields}</div>
            <div>
              <button
                onClick={() => props.handleConfirm()}
                style={{ backgroundColor: '#28a745' }}
              >
                Confirm
              </button>
              <button
                onClick={() => props.handleCancel()}
                style={{ backgroundColor: '#dc3545' }}
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
