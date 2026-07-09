import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { FilterFieldConfig } from "./form-filter.type";
import { Button } from "@/components/ui/button";
import { resetQueryParams } from "@/lib/searchparams";

interface FormFilterProps<T extends Record<string, any>> {
  fields: FilterFieldConfig[];
  defaultValues?: T;
  onSubmit: (values: T) => void;
  onReset?: () => void;
  className?: string;
  layout?: "horizontal" | "vertical";
}
const FormFilter = <T extends Record<string, any>>(props: FormFilterProps<T>) => {
  const {
    fields,
    defaultValues,
    onSubmit,
    onReset,
    className,
    layout = "horizontal",
  } = props;
  const form = useAppForm({
    defaultValues,
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  const { FormTextField, FormSelectField, FormDatePickerField, FormCheckboxField } =
    useFormFields<T>();

  const renderField = (field: FilterFieldConfig<T>) => {
    switch (field.type) {
      case "text": {
        const { name, type, ...rest } = field;
        return <FormTextField key={name} name={name} {...rest} />;
      }

      case "select": {
        const { name, type, ...rest } = field;
        return <FormSelectField key={name} name={name} {...rest} />;
      }

      case "date": {
        const { name, type, ...rest } = field;
        return <FormDatePickerField key={name} name={name} {...rest} />;
      }

      case "checkbox": {
        const { name, type, ...rest } = field;
        return <FormCheckboxField key={name} name={name} {...rest} />;
      }

      default: {
        const _exhaustive: never = field;
        return null;
      }
    }
  };

  const handleReset = () => {
    // const values = form.state.values;
    onReset?.();
    form.reset();
  };

  return (
    <form.AppForm>
      <form.Form className={className}>
        <div className="flex flex-wrap items-end gap-4">
          {fields.map(renderField)}

          <div className="ml-auto flex gap-2">
            <Button type="submit">Apply</Button>

            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </form.Form>
    </form.AppForm>
  );
};

export { FormFilter };
