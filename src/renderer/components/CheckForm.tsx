import Form, { GenericFormProps } from 'src/renderer/components/generic/Form';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
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
import { useCallback } from 'react';

interface CheckFormProps extends GenericFormProps {
  dbFormValues: CheckDb;
  invalidateCache: () => void;
}

interface CheckFormFieldProps {
  register: any;
  errors: FieldErrors<CheckDb>;
  dbFormValues: CheckDb;
  isEdit: boolean;
}

function CheckFormFields({
  register,
  errors,
  dbFormValues,
  isEdit,
}: CheckFormFieldProps) {
  return (
    <div>
      <label htmlFor={CheckUiAttr.name}>
        Name
        <input
          id={CheckUiAttr.name}
          type="text"
          {...register(CheckUiAttr.name)}
        />
        <ErrorMessage errors={errors} name={CheckUiAttr.name} />
      </label>
      <label htmlFor={CheckUiAttr.note}>
        Note
        <textarea id={CheckUiAttr.note} {...register(CheckUiAttr.note)} />
      </label>
      <label htmlFor={CheckUiAttr.isEnabled}>
        Enabled
        <input
          id={CheckUiAttr.isEnabled}
          type="checkbox"
          {...register(CheckUiAttr.isEnabled)}
        />
      </label>
      <label htmlFor={CheckUiAttr.frequency}>
        Frequency (seconds)
        <input
          id={CheckUiAttr.frequency}
          role="spinbutton"
          step="1"
          type="number"
          min="60"
          {...register(CheckUiAttr.frequency)}
        />
        <ErrorMessage errors={errors} name={CheckUiAttr.frequency} />
      </label>

      <div>
        <header>Browser Config</header>
        <label htmlFor={CheckUiAttr.browserConfig.url}>
          Link
          <input
            id={CheckUiAttr.browserConfig.url}
            type="text"
            {...register(CheckUiAttr.browserConfig.url)}
          />
          <ErrorMessage errors={errors} name={CheckUiAttr.browserConfig.url} />
        </label>
        <label htmlFor={CheckUiAttr.browserConfig.checkText}>
          Check Text
          <input
            id={CheckUiAttr.browserConfig.checkText}
            type="checkbox"
            {...register(CheckUiAttr.browserConfig.checkText)}
          />
        </label>

        <label htmlFor={CheckUiAttr.browserConfig.checkHtml}>
          Check HTML
          <input
            id={CheckUiAttr.browserConfig.checkHtml}
            type="checkbox"
            {...register(CheckUiAttr.browserConfig.checkHtml)}
          />
        </label>

        <label htmlFor={CheckUiAttr.browserConfig.checkScreenshot}>
          Check Screenshot
          <input
            id={CheckUiAttr.browserConfig.checkScreenshot}
            type="checkbox"
            {...register(CheckUiAttr.browserConfig.checkScreenshot)}
          />
        </label>

        <label htmlFor={CheckUiAttr.browserConfig.locator}>
          Locator
          <textarea
            id={CheckUiAttr.browserConfig.locator}
            {...register(CheckUiAttr.browserConfig.locator)}
          />
          <ErrorMessage
            errors={errors}
            name={CheckUiAttr.browserConfig.locator}
          />
        </label>
      </div>
      <div style={{ display: isEdit ? 'block' : 'none' }}>
        <header>Discovery History</header>
        <Discoveries ids={dbFormValues.discoveryHistory} />
        <header>Tags</header>
        <table />
      </div>
    </div>
  );
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

  const onReset = useCallback(() => {
    reset(defaultCheckObj);
  }, [reset]);

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
      fields={CheckFormFields({
        register,
        errors,
        dbFormValues,
        isEdit,
      })}
      reset={onReset}
      isEdit={isEdit}
    />
  );
}

export default CheckForm;
