import Form, { GenericFormProps } from 'src/renderer/components/generic/Form';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { DbSchemaTypes } from 'src/schema/dbSchema';
import { typeboxResolver } from '@hookform/resolvers/typebox';
import { ErrorMessage } from '@hookform/error-message';
import { insert } from 'src/renderer/db';

import {
  Rank,
  RankDb,
  RankUiAttr,
  RankUiSchema,
  defaultRankObj,
} from 'src/schema/rank';
import PieceSelector from './fields/PieceSelector';
import ColorSelector from './fields/ColorSelector';

interface RankFormProps extends GenericFormProps {
  dbFormValues: RankDb;
  invalidateCache: () => void;
}

interface RankFormFieldProps {
  register: any;
  errors: FieldErrors<RankDb>;
  dbFormValues: RankDb;
}

function RankFormFields({
  register,
  errors,
  dbFormValues,
}: RankFormFieldProps) {
  return (
    <div>
      <label htmlFor={RankUiAttr.name}>
        Name
        <input
          id={RankUiAttr.name}
          type="text"
          {...register(RankUiAttr.name)}
        />
        <ErrorMessage name={RankUiAttr.name} errors={errors} />
      </label>
      <label htmlFor={RankUiAttr.color}>
        Color
        <ColorSelector
          id={RankUiAttr.color}
          register={register(RankUiAttr.color)}
          initialColor={dbFormValues.color}
        />
        <ErrorMessage name={RankUiAttr.color} errors={errors} />
      </label>
      <label htmlFor={RankUiAttr.piece}>
        Piece
        <PieceSelector
          register={register(RankUiAttr.piece)}
          id={RankUiAttr.piece}
        />
        <ErrorMessage name={RankUiAttr.piece} errors={errors} />
      </label>
      <label htmlFor={RankUiAttr.note}>
        Note
        <textarea id={RankUiAttr.note} {...register(RankUiAttr.note)} />
        <ErrorMessage name={RankUiAttr.note} errors={errors} />
      </label>
    </div>
  );
}

function RankForm({
  dbFormValues,
  invalidateCache,
  isEdit,
  isOpen,
  setIsOpen,
}: RankFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Rank>({
    resolver: typeboxResolver(RankUiSchema),
    defaultValues: defaultRankObj,
    values: dbFormValues,
  });
  const onSubmit: SubmitHandler<Rank> = (data: Rank) => {
    const dbData = data as RankDb;
    insert(dbData, DbSchemaTypes.rank);
    setIsOpen(false);
    reset(defaultRankObj);
    invalidateCache();
  };
  const onError = (error: any) => {
    console.log('error:', error);
  };
  return (
    <Form
      title="Rank"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handleConfirm={handleSubmit(onSubmit, onError)}
      fields={RankFormFields({
        register,
        errors,
        dbFormValues,
      })}
      reset={reset}
      defaultFormValues={defaultRankObj}
      dbFormValues={dbFormValues}
      isEdit={isEdit}
    />
  );
}

export default RankForm;
