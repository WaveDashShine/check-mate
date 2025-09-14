import Form, { GenericFormProps } from 'src/renderer/components/generic/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
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

function CheckForm({
  dbFormValues,
  invalidateCache,
  isEdit,
  isOpen,
  setIsOpen,
}: CheckFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Check>({
    resolver: typeboxResolver(CheckUiSchema),
    defaultValues: defaultCheckObj,
    values: dbFormValues,
  });

  function CheckFormFields() {
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
            />
          </label>

          <label>
            Check HTML
            <input
              type="checkbox"
              {...register(CheckUiAttr.browserConfig.checkHtml)}
            />
          </label>

          <label>
            Check Screenshot
            <input
              type="checkbox"
              {...register(CheckUiAttr.browserConfig.checkScreenshot)}
            />
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
        <div style={{ display: isEdit ? 'block' : 'none' }}>
          <label>Discovery History</label>
          <Discoveries ids={dbFormValues.discoveryHistory} />
          <label>Tags</label>
          <table />
        </div>
      </div>
    );
  }

  const onReset = () => {
    reset(defaultCheckObj);
  };

  const onSubmit: SubmitHandler<Check> = (data: Check) => {
    console.log('submitted', data);
    const dbData = data as CheckDb;
    insert(dbData, DbSchemaTypes.check);
    setIsOpen(false);
    onReset();
    invalidateCache();
  };

  const onError = (error: any) => {
    console.log('error:', error);
  };

  return (
    <Form
      title="Check"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handleConfirm={handleSubmit(onSubmit, onError)}
      fields={CheckFormFields()}
      reset={onReset}
      isEdit={isEdit}
    />
  );
}

export default CheckForm;
