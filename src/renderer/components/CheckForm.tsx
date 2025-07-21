import Form, { BaseFormProps } from 'src/renderer/components/Form';

function CheckFormFields() {
  // TODO: finish defining the rest of the fields
  // TODO: how to pass these form values to the handleConfirm method??
  return (
    <div>
      <label>Name</label>
      <input />
    </div>
  );
}

function CheckForm(props: BaseFormProps) {
  return (
    <Form
      title={'Check'}
      isOpen={props.isOpen}
      handleConfirm={props.handleConfirm}
      handleCancel={props.handleCancel}
      fields={CheckFormFields()}
    ></Form>
  );
}

export default CheckForm;
