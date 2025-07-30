import Form, { GenericFormProps } from 'src/renderer/components/Form';
import 'src/renderer/components/CheckForm.css';
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form';
import { Check, CheckKeys, CheckSchema, defaultCheck } from 'src/schema';
import { typeboxResolver } from '@hookform/resolvers/typebox';
import { ErrorMessage } from '@hookform/error-message';

function CheckFormFields(
  register: UseFormRegister<Check>,
  errors: FieldErrors<Check>,
  isEdit: boolean = false,
) {
  return (
    <div>
      <label>Name</label>
      <input type="text" {...register(CheckKeys.name)} />
      <ErrorMessage errors={errors} name={CheckKeys.name} />
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
        <ErrorMessage errors={errors} name={CheckKeys.browserConfig.url} />
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
      <div style={{ display: isEdit ? 'block' : 'none' }}>
        <label>Alert History</label>
        <table></table>
        <label>Tags</label>
        <table></table>
      </div>
    </div>
  );
}

function CheckForm(props: GenericFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Check>({
    resolver: typeboxResolver(CheckSchema),
    defaultValues: defaultCheck,
  });

  const onSubmit: SubmitHandler<Check> = (data) => {
    console.log(data);
    props.setIsOpen(false);
    onReset();
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const onReset = () => {
    reset(defaultCheck);
  };

  return (
    <Form
      title={'Check'}
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpen}
      handleConfirm={handleSubmit(onSubmit, onError)}
      fields={CheckFormFields(register, errors)}
      reset={onReset}
    ></Form>
  );
}

export default CheckForm;
