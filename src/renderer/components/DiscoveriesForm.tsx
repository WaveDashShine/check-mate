import Form, { GenericFormProps } from 'src/renderer/components/generic/Form';
import { FieldErrors, useForm } from 'react-hook-form';
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

function DiscoveriesFormFields(
  register: any,
  errors: FieldErrors<DiscoveryDb>,
  dbFormValues: DiscoveryDb,
) {
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
      </label>
      <label htmlFor={DiscoveryUiAttr.html}>
        HTML
        <textarea
          id={DiscoveryUiAttr.html}
          {...register(DiscoveryUiAttr.html)}
          disabled
        />
      </label>
      <label htmlFor={DiscoveryUiAttr.text}>
        Text
        <textarea
          id={DiscoveryUiAttr.text}
          {...register(DiscoveryUiAttr.text)}
          disabled
        />
      </label>
      <p>
        Screenshot
        <Screenshot
          data={dbFormValues.screenshot}
          {...register(DiscoveryUiAttr.screenshot)}
        />
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
      fields={DiscoveriesFormFields(register, errors, dbFormValues)}
      handleConfirm={() => {}}
      reset={() => {}}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isEdit={isEdit}
    />
  );
}

export default DiscoveriesForm;
