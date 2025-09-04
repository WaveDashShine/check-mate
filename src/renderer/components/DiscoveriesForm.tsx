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
import Screenshot from 'src/renderer/components/fields/Screenshot';

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
        <Screenshot
          data={props.dbFormValues.screenshot}
          {...register(DiscoveryUiAttr.screenshot)}
        ></Screenshot>
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
