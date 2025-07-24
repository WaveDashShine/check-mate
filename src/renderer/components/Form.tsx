import React from 'react';
import 'src/renderer/components/Form.css';

export interface BaseFormProps {
  isOpen: boolean;
  handleConfirm: (formData: FormData) => void;
  handleCancel: () => void;
}

interface FormProps extends BaseFormProps {
  title: string;
  fields: any;
}

function Form(props: FormProps) {
  return (
    <form action={props.handleConfirm}>
      {props.isOpen && (
        <div>
          <div>
            <h2>{props.title}</h2>
            <div>{props.fields}</div>
            <div>
              <button className="confirm" type="submit">
                Confirm
              </button>
              <button className="cancel" onClick={() => props.handleCancel()}>
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
