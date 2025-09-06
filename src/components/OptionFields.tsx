import { Icon, Select, TextField } from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { DiscountForm } from "../types/discount";

export interface OptionFieldProps {
  index: number;
  remove: (index?: number) => void;
  totalOptions: number;
}

export const OptionFields: React.FC<OptionFieldProps> = ({
  index,
  remove,
  totalOptions,
}) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<DiscountForm>();

  const discountType = watch(`options.${index}.discountType`);

  const discountTypeOptions = [
    { label: "None", value: "none" },
    { label: "% discount", value: "percent" },
    { label: "Discount / each", value: "amount" },
  ];

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "6px",
        marginBottom: "16px",
        position: "relative",
        padding: "16px",
        background: "#fff",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-1px",
          left: "-1px",
          background: "#d35400",
          color: "#fff",
          fontWeight: 600,
          fontSize: "14px",
          padding: "4px 12px",
          borderTopLeftRadius: "6px",
          borderBottomRightRadius: "6px",
        }}
      >
        OPTION {index + 1}
      </div>

      <div style={{ position: "absolute", top: "8px", right: "8px" }}>
        {totalOptions > 1 && (
          <button
            type="button"
            onClick={() => remove(index)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <Icon source={DeleteIcon} tone="base" />
          </button>
        )}
      </div>

      <div style={{ marginTop: "12px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          {/* Title */}
          <Controller
            control={control}
            name={`options.${index}.title`}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextField
                label="Title"
                autoComplete="off"
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors?.options?.[index]?.title?.message}
              />
            )}
          />

          {/* Subtitle */}
          <Controller
            control={control}
            name={`options.${index}.subtitle`}
            render={({ field }) => (
              <TextField
                label="Subtitle"
                autoComplete="off"
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />

          {/* Label */}
          <Controller
            control={control}
            name={`options.${index}.label`}
            render={({ field }) => (
              <TextField
                label="Label (optional)"
                autoComplete="off"
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "16px",
          }}
        >
          {/* Quantity */}
          <Controller
            control={control}
            name={`options.${index}.quantity`}
            rules={{
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
            }}
            render={({ field }) => (
              <TextField
                label="Quantity"
                type="number"
                autoComplete="off"
                min={1}
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(val) =>
                  field.onChange(val === "" ? undefined : Number(val))
                }
                onBlur={field.onBlur}
                error={errors?.options?.[index]?.quantity?.message}
              />
            )}
          />

          {/* Discount type */}
          <Controller
            control={control}
            name={`options.${index}.discountType`}
            render={({ field }) => (
              <Select
                label="Discount type"
                options={discountTypeOptions}
                value={field.value || "none"}
                onChange={field.onChange}
              />
            )}
          />

          {/* Amount */}
          <Controller
            control={control}
            name={`options.${index}.amount`}
            rules={{
              validate: (val) => {
                if (
                  discountType !== "none" &&
                  (val === undefined || val === null)
                ) {
                  return "Amount is required";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <TextField
                label="Amount"
                type="number"
                autoComplete="off"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(val) =>
                  field.onChange(val === "" ? undefined : Number(val))
                }
                onBlur={field.onBlur}
                error={errors?.options?.[index]?.amount?.message}
                suffix={
                  discountType === "percent"
                    ? "%"
                    : discountType === "amount"
                    ? "$"
                    : undefined
                }
                disabled={discountType === "none"}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
