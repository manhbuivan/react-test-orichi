import {
  Box,
  Button,
  Card,
  FormLayout,
  Text,
  TextField,
} from "@shopify/polaris";
import {
  Controller,
  type Control,
  type FieldArrayWithId,
  type UseFieldArrayRemove,
} from "react-hook-form";
import type { DiscountForm } from "../types/discount";
import { OptionFields } from "./OptionFields";

interface IGeneralFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<DiscountForm, any, DiscountForm>;
  fields: FieldArrayWithId<DiscountForm, "options", "id">[];
  remove: UseFieldArrayRemove;
  addOption: () => void;
}

const GeneralForm = ({
  control,
  fields,
  remove,
  addOption,
}: IGeneralFormProps) => {
  return (
    <div>
      <Box width="550px">
        <Card>
          <div style={{ paddingBottom: 10 }}>
            <Text as="h2" variant="headingMd" alignment="start">
              General
            </Text>
          </div>
          <FormLayout>
            <Controller
              name="campaign"
              control={control}
              rules={{ required: "Campaign is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Campaign"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  autoComplete="off"
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="title"
              control={control}
              //   rules={{ required: "Title is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Title"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  autoComplete="off"
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Description"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  autoComplete="off"
                />
              )}
            />
          </FormLayout>
        </Card>
        <div style={{ marginTop: 10 }}>
          <Card>
            <div style={{ paddingBottom: 10 }}>
              <Text as="h2" variant="headingMd" alignment="start">
                Volume discount rule
              </Text>
            </div>
            {fields.map((field, index) => (
              <OptionFields
                key={field.id}
                index={index}
                remove={remove}
                totalOptions={fields.length}
              />
            ))}
            <div style={{ textAlign: "center", marginTop: "12px" }}>
              <button
                type="button"
                onClick={addOption}
                style={{
                  background: "#d35400",
                  color: "#fff",
                  padding: "8px 16px",
                  fontSize: "15px",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "#fff",
                    color: "#d35400",
                    fontWeight: "bold",
                    fontSize: "14px",
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
                Add option
              </button>
            </div>
            <div style={{ marginTop: 10 }}>
              <Button submit variant="primary">
                Save
              </Button>
            </div>
          </Card>
        </div>
      </Box>
    </div>
  );
};

export default GeneralForm;
