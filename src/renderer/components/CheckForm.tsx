import Form, { GenericFormProps } from 'src/renderer/components/Form';
import 'src/renderer/components/CheckForm.css';
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form';
import {
  Check,
  CheckUiAttr,
  CheckUiSchema,
  defaultCheckObj,
  CheckDb,
} from 'src/schema';
import { typeboxResolver } from '@hookform/resolvers/typebox';
import { ErrorMessage } from '@hookform/error-message';
import { insert } from 'src/renderer/db';

function CheckFormFields(
  register: UseFormRegister<Check>,
  errors: FieldErrors<Check>,
  isEdit: boolean = false,
) {
  return (
    <div>
      <label>Name</label>
      <input type="text" {...register(CheckUiAttr.name)} />
      <ErrorMessage errors={errors} name={CheckUiAttr.name} />
      {/*
      TODO: separate the edit and create fields
      */}
      <label>Note</label>
      <textarea {...register(CheckUiAttr.note)} />
      <label>Enabled</label>
      <button
        role="switch"
        aria-checked="true"
        {...register(CheckUiAttr.isEnabled)}
      ></button>
      <label>Frequency (seconds)</label>
      <input
        role="spinbutton"
        step="1"
        type="number"
        {...register(CheckUiAttr.frequency)}
      />
      <div>
        <label>Browser Config</label>
        <label>Link</label>
        <input type="text" {...register(CheckUiAttr.browserConfig.url)} />
        <ErrorMessage errors={errors} name={CheckUiAttr.browserConfig.url} />
        <label>Check Text</label>
        <button
          role="switch"
          aria-checked="false"
          {...register(CheckUiAttr.browserConfig.checkText)}
        ></button>
        <label>Check HTML</label>
        <button
          role="switch"
          aria-checked="false"
          {...register(CheckUiAttr.browserConfig.checkHtml)}
        ></button>
        <label>Check Screenshot</label>
        <button
          role="switch"
          aria-checked="false"
          {...register(CheckUiAttr.browserConfig.checkScreenshot)}
        ></button>
        <label>Locator</label>
        <input type="text" {...register(CheckUiAttr.browserConfig.locator)} />
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
    resolver: typeboxResolver(CheckUiSchema),
    defaultValues: defaultCheckObj,
  });

  const onSubmit: SubmitHandler<Check> = (data: Check) => {
    console.log('submitted', data);
    props.setIsOpen(false);
    onReset();
    const dbData = data as CheckDb;
    insert(dbData);
  };

  const onError = (error: any) => {
    console.log('error:', error);
  };

  const onReset = () => {
    reset(defaultCheckObj);
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
