import Form, { GenericFormProps } from 'src/renderer/components/generic/Form';
import 'src/renderer/components/CheckForm.css';
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form';
import { typeboxResolver } from '@hookform/resolvers/typebox';
import {
  DiscoveryDb,
  Discovery,
  DiscoveryUiSchema,
  DiscoveryUiAttr,
} from 'src/schema/discovery';

interface DiscoveriesFormProps extends GenericFormProps {
  dbFormValues: DiscoveryDb;
}

function DiscoveriesForm(props: DiscoveriesFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Discovery>({
    resolver: typeboxResolver(DiscoveryUiSchema),
    values: props.dbFormValues,
  });
  const DiscoveriesFormFields = () => {
    return (
      <div>
        <label>
          Timestamp
          <input
            type="text"
            {...register(DiscoveryUiAttr.timestamp)}
            disabled={true}
          />
        </label>
        <label>
          HTML
          <textarea {...register(DiscoveryUiAttr.html)} disabled={true} />
        </label>
        <label>
          Text
          <textarea {...register(DiscoveryUiAttr.text)} disabled={true} />
        </label>
        <label>Screenshot</label>
        <div {...register(DiscoveryUiAttr.screenshot)}></div>
      </div>
    );
  };
  return (
    <Form
      title={'Discovery'}
      fields={DiscoveriesFormFields()}
      handleConfirm={() => {}}
      reset={() => {}}
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpen}
      isEdit={props.isEdit}
    ></Form>
  );
}

export default DiscoveriesForm;
