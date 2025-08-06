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
      {/*
      TODO: separate the edit and create fields
      */}
      <label>
        Name
        <input type="text" {...register(CheckUiAttr.name)} />
        <ErrorMessage errors={errors} name={CheckUiAttr.name} />
      </label>
      <label>
        Note
        <textarea {...register(CheckUiAttr.note)} />
      </label>
      <label>
        Enabled
        <input type="checkbox" {...register(CheckUiAttr.isEnabled)} />
      </label>
      <label>
        Frequency (seconds)
        <input
          role="spinbutton"
          step="1"
          type="number"
          {...register(CheckUiAttr.frequency)}
        />
      </label>

      <div>
        <label>Browser Config</label>
        <label>
          Link
          <input type="text" {...register(CheckUiAttr.browserConfig.url)} />
          <ErrorMessage errors={errors} name={CheckUiAttr.browserConfig.url} />
        </label>
        <label>
          Check Text
          <input
            type="checkbox"
            {...register(CheckUiAttr.browserConfig.checkText)}
          ></input>
        </label>

        <label>
          Check HTML
          <input
            type="checkbox"
            {...register(CheckUiAttr.browserConfig.checkHtml)}
          ></input>
        </label>

        <label>
          Check Screenshot
          <input
            type="checkbox"
            {...register(CheckUiAttr.browserConfig.checkScreenshot)}
          ></input>
        </label>

        <label>
          Locator
          <textarea {...register(CheckUiAttr.browserConfig.locator)} />
        </label>
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
