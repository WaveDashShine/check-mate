import Form, { GenericFormProps } from 'src/renderer/components/Form';
import 'src/renderer/components/CheckForm.css';
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import { ICheck } from 'src/main/schema';

function CheckFormFields(
  register: UseFormRegister<ICheck>,
  isEdit: boolean = false,
) {
  return (
    <div>
      <label>Name</label>
      <input type="text" {...register('name', { required: true })} />
      {/*
      TODO: register the rest of the fields
      TODO: have a string enum of the names, based off the interface
      TODO: separate the edit and create fields
      */}
      <label>Note</label>
      <textarea name="note" />
      <label>Enabled</label>
      <button role="switch" aria-checked="true" name="enabled"></button>
      <label>Frequency (seconds)</label>
      <input role="spinbutton" step="1" type="number" name="frequency" />
      <div>
        <label>Browser Config</label>
        <label>Link</label>
        <input type="text" name="link" />
        <label>Check Text</label>
        <button role="switch" aria-checked="false" name="checkText"></button>
        <label>Check HTML</label>
        <button role="switch" aria-checked="false" name="checkHtml"></button>
        <label>Check Screenshot</label>
        <button
          role="switch"
          aria-checked="false"
          name="checkScreenshot"
        ></button>
        <label>Locator</label>
        <input type="text" name="locator" />
      </div>
      <label>Alert History</label>
      <table></table>
      <label>Tags</label>
      <table></table>
    </div>
  );
}

function CheckForm(props: GenericFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICheck>();
  const onSubmit: SubmitHandler<ICheck> = (data) => {
    console.log(data);
    props.setIsOpen(false);
  };
  return (
    <Form
      title={'Check'}
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpen}
      handleConfirm={handleSubmit(onSubmit)}
      fields={CheckFormFields(register)}
    ></Form>
  );
}

export default CheckForm;
