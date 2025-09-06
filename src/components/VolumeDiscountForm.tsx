import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { saveDiscount } from "../api/discountApi";
import type { DiscountForm } from "../types/discount";
import GeneralForm from "./GeneralForm";
import { Preview } from "./Preview";

export function VolumeDiscountForm() {
  const methods = useForm<DiscountForm>({
    defaultValues: {
      campaign: "",
      title: "",
      description: "",
      options: [
        {
          title: "",
          subtitle: "",
          label: "",
          quantity: 1,
          discountType: "none",
          amount: undefined,
        },
        {
          title: "",
          subtitle: "",
          label: "",
          quantity: 1,
          discountType: "none",
          amount: undefined,
        },
      ],
    },
  });

  const { handleSubmit, control, watch } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = async (data: DiscountForm) => {
    if (data.options.length === 0) {
      alert("At least 1 option is required");
      return;
    }

    try {
      const result = await saveDiscount(data);
      console.log("API response:", result);
      alert("Saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error while saving data!");
    }
  };

  const addOption = () => {
    append({
      id: "",
      title: "",
      subtitle: "",
      label: "",
      quantity: 1,
      discountType: "none",
      amount: undefined,
    });
  };

  const campaign = watch("campaign");
  const description = watch("description");
  const options = watch("options");

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", gap: 15 }}>
          <GeneralForm
            control={control}
            fields={fields}
            remove={remove}
            addOption={addOption}
          />
          <div>
            <Preview
              campaign={campaign}
              description={description}
              options={options}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
