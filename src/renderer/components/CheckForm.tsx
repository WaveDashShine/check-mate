import Form, { GenericFormProps } from 'src/renderer/components/generic/Form';
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form';
import { DbSchemaTypes } from 'src/schema/dbSchema';
import { typeboxResolver } from '@hookform/resolvers/typebox';
import { ErrorMessage } from '@hookform/error-message';
import { insert } from 'src/renderer/db';
import {
  Check,
  CheckDb,
  CheckUiAttr,
  CheckUiSchema,
  defaultCheckObj,
} from 'src/schema/check';
import Discoveries from 'src/renderer/components/Discoveries';

interface CheckFormProps extends GenericFormProps {
  dbFormValues: CheckDb;
  invalidateCache: () => void;
}

function CheckForm(props: CheckFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Check>({
    resolver: typeboxResolver(CheckUiSchema),
    defaultValues: defaultCheckObj,
    values: props.dbFormValues,
  });

  const CheckFormFields = () => {
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
            min="60"
            {...register(CheckUiAttr.frequency)}
          />
          <ErrorMessage errors={errors} name={CheckUiAttr.frequency} />
        </label>

        <div>
          <label>Browser Config</label>
          <label>
            Link
            <input type="text" {...register(CheckUiAttr.browserConfig.url)} />
            <ErrorMessage
              errors={errors}
              name={CheckUiAttr.browserConfig.url}
            />
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
            <ErrorMessage
              errors={errors}
              name={CheckUiAttr.browserConfig.locator}
            />
          </label>
        </div>
        <div style={{ display: props.isEdit ? 'block' : 'none' }}>
          <label>Discovery History</label>
          <Discoveries ids={props.dbFormValues.discoveryHistory}></Discoveries>
          <label>Tags</label>
          <table></table>
        </div>
      </div>
    );
  };

  const onSubmit: SubmitHandler<Check> = (data: Check) => {
    console.log('submitted', data);
    const dbData = data as CheckDb;
    insert(dbData, DbSchemaTypes.check);
    props.setIsOpen(false);
    onReset();
    props.invalidateCache();
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
      fields={CheckFormFields()}
      reset={onReset}
      isEdit={props.isEdit}
    ></Form>
  );
}

export default CheckForm;
