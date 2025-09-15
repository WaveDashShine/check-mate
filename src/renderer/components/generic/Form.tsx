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

function Form({
  fields,
  handleConfirm,
  isEdit,
  isOpen,
  reset,
  setIsOpen,
  title,
}: FormProps) {
  const handleCancel = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (!isEdit) {
      reset();
    }
  }, [isEdit, reset]);
  return (
    <div className="form-container grid">
      {isOpen && (
        <div>
          <div>
            <h2>{title}</h2>
            <div>{fields}</div>
            <div>
              <button
                className="confirm bg-green-500 cursor-pointer rounded-xl"
                type="submit"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                type="button"
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
