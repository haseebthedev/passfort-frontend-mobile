import { useFormik, FormikConfig, FormikValues } from "formik";

type SubmitFunction<T> = (values: T) => void | Promise<void>;

export function useFormikHook<T extends FormikValues>(
  submit: SubmitFunction<T>,
  validationSchema: FormikConfig<T>["validationSchema"],
  initialValues: T
) {
  const { handleChange, handleSubmit, setFieldTouched, setFieldValue, errors, touched, values, resetForm } =
    useFormik<T>({
      initialValues,
      onSubmit: submit,
      validationSchema,
    });

  return {
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
    resetForm,
  };
}
