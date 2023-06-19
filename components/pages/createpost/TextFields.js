import ControlledInputField from '../../InputField/ControlledInputField';
const TextFields = ({ control, errors }) => {
  return (
    <>
      <ControlledInputField
        label={'Title *'}
        placeholder={
          'Enter the title of issue eg. road problem,praking problem'
        }
        rules={{
          required: {
            value: true,
            message: '* title is required',
          },
        }}
        control={control}
        name={'title'}
        hasError={errors?.title}
        errorMessage={errors?.title?.message}
      />
      <ControlledInputField
        rules={{
          required: {
            value: true,
            message: '* description is required',
          },
        }}
        label={'Description *'}
        placeholder={'Enter the Description of issue'}
        control={control}
        name={'description'}
        hasError={errors?.description}
        errorMessage={errors?.description?.message}
        multiline
      />
      <ControlledInputField
        rules={{
          required: {
            value: true,
            message: '* location is required',
          },
        }}
        label={'Full Location *'}
        placeholder={'Enter the full location'}
        control={control}
        name={'fullLocation'}
        hasError={errors.fullLocation}
        errorMessage={errors?.fullLocation?.message}
      />
    </>
  );
};

export default TextFields;
