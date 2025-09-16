import Form, { GenericFormProps } from 'src/renderer/components/generic/Form';
import { FieldErrors, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { typeboxResolver } from '@hookform/resolvers/typebox';
import {
  DiscoveryDb,
  Discovery,
  DiscoveryUiSchema,
  DiscoveryUiAttr,
} from 'src/schema/discovery';
import Screenshot from 'src/renderer/components/fields/Screenshot';

interface DiscoveriesFormProps extends GenericFormProps {
  dbFormValues: DiscoveryDb;
}

interface DiscoveriesFormFieldsProps {
  register: any;
  errors: FieldErrors<DiscoveryDb>;
  dbFormValues: DiscoveryDb;
}

function DiscoveriesFormFields({
  register,
  errors,
  dbFormValues,
}: DiscoveriesFormFieldsProps) {
  return (
    <div>
      <label htmlFor={DiscoveryUiAttr.timestamp}>
        Timestamp
        <input
          id={DiscoveryUiAttr.timestamp}
          type="text"
          {...register(DiscoveryUiAttr.timestamp)}
          disabled
        />
        <ErrorMessage errors={errors} name={DiscoveryUiAttr.timestamp} />
      </label>
      <label htmlFor={DiscoveryUiAttr.html}>
        HTML
        <textarea
          id={DiscoveryUiAttr.html}
          {...register(DiscoveryUiAttr.html)}
          disabled
        />
        <ErrorMessage errors={errors} name={DiscoveryUiAttr.html} />
      </label>
      <label htmlFor={DiscoveryUiAttr.text}>
        Text
        <textarea
          id={DiscoveryUiAttr.text}
          {...register(DiscoveryUiAttr.text)}
          disabled
        />
        <ErrorMessage errors={errors} name={DiscoveryUiAttr.text} />
      </label>
      <p>
        Screenshot
        <Screenshot data={dbFormValues.screenshot} />
      </p>
    </div>
  );
}

function DiscoveriesForm({
  dbFormValues,
  isEdit,
  isOpen,
  setIsOpen,
}: DiscoveriesFormProps) {
  const {
    register,
    formState: { errors },
  } = useForm<Discovery>({
    resolver: typeboxResolver(DiscoveryUiSchema),
    values: dbFormValues,
  });
  return (
    <Form
      title="Discovery"
      fields={DiscoveriesFormFields({ register, errors, dbFormValues })}
      handleConfirm={() => {}}
      reset={() => {}}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isEdit={isEdit}
    />
  );
}

export default DiscoveriesForm;
