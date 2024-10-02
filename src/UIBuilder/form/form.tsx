import type {
  FormTextArea,
  FormInput,
  FormSelect,
  FormRadio,
  FormRadioGroup,
  FormCheckbox,
  FormCheckboxGroup,
  FormSwitch,
  FormSlider,
  FormDatePicker,
  FormTimePicker,
  FormAutoComplete,
  FormCascader,
  FormTreeSelect,
  FormUpload,
  FormInputNumber,
  FormRating,
  FormTagInput,
  BaseFormProps,
  CommonFieldProps,
  useFormState,
} from "@kousum/semi-ui-vue";
import { Form } from "@kousum/semi-ui-vue";

export type BaseFormFieldType =
  | typeof FormInput
  | typeof FormTextArea
  | typeof FormSelect
  | typeof FormRadio
  | typeof FormRadioGroup
  | typeof FormCheckbox
  | typeof FormCheckboxGroup
  | typeof FormSwitch
  | typeof FormSlider
  | typeof FormDatePicker
  | typeof FormTimePicker
  | typeof FormAutoComplete
  | typeof FormCascader
  | typeof FormTreeSelect
  | typeof FormUpload
  | typeof FormInputNumber
  | typeof FormRating
  | typeof FormTagInput;

type UnRef<T> = T extends { value: infer V } ? V : T;

export interface BaseFormItem extends CommonFieldProps {
  type: BaseFormFieldType;
  canShow?: boolean | ((formState: UnRef<ReturnType<typeof useFormState>>) => boolean);
}

export interface FormType<
  F extends BaseFormItem[],
  V extends Record<string, any> = any,
> extends BaseFormProps<V> {
  formItems: F;
}

export function createForm<F extends BaseFormItem[]>(form: FormType<F>) {
  const { formItems, ...props } = form;
  return <Form></Form>;
}
