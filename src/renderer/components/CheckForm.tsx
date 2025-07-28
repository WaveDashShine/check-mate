import Form, { GenericFormProps } from 'src/renderer/components/Form';
import 'src/renderer/components/CheckForm.css';
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import { ICheck, CheckKeys } from 'src/schema';
import Checks from '../pages/Checks';

function CheckFormFields(
  register: UseFormRegister<ICheck>,
  isEdit: boolean = false,
) {
  return (
    <div>
      <label>Name</label>
      <input type="text" {...register(CheckKeys.name)} />
      {/*
      TODO: separate the edit and create fields
      */}
      <label>Note</label>
      <textarea {...register(CheckKeys.note)} />
      <label>Enabled</label>
      <button
        role="switch"
        aria-checked="true"
        {...register(CheckKeys.isEnabled)}
      ></button>
      <label>Frequency (seconds)</label>
      <input
        role="spinbutton"
        step="1"
        type="number"
        {...register(CheckKeys.frequency)}
      />
      <div>
        <label>Browser Config</label>
        <label>Link</label>
        <input type="text" {...register(CheckKeys.browserConfig.url)} />
        <label>Check Text</label>
        <button
          role="switch"
          aria-checked="false"
          {...register(CheckKeys.browserConfig.checkText)}
        ></button>
        <label>Check HTML</label>
        <button
          role="switch"
          aria-checked="false"
          {...register(CheckKeys.browserConfig.checkHtml)}
        ></button>
        <label>Check Screenshot</label>
        <button
          role="switch"
          aria-checked="false"
          {...register(CheckKeys.browserConfig.checkScreenshot)}
        ></button>
        <label>Locator</label>
        <input type="text" {...register(CheckKeys.browserConfig.locator)} />
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
