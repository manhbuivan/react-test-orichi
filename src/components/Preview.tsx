import { Box, Card, DataTable, Text } from "@shopify/polaris";
import React from "react";

export interface PreviewProps {
  campaign: string;
  description?: string;
  options: Array<{
    title: string;
    quantity: number;
    discountType: string;
    amount?: number;
  }>;
}

export const Preview: React.FC<PreviewProps> = ({
  campaign,
  description,
  options,
}) => {
  const rows = options.map((opt) => {
    let discountLabel = "";
    let amountLabel = "-";

    switch (opt.discountType) {
      case "percent":
        discountLabel = "% discount";
        amountLabel = opt.amount !== undefined ? `${opt.amount}%` : "-";
        break;
      case "amount":
        discountLabel = "Discount / each";
        amountLabel = opt.amount !== undefined ? `$${opt.amount}` : "-";
        break;
      default:
        discountLabel = "None";
        amountLabel = "-";
        break;
    }

    return [opt.title, discountLabel, opt.quantity, amountLabel];
  });

  return (
    <Box width="550px">
      <Card>
        <div style={{ paddingBottom: 10 }}>
          <Text as="h2" variant="headingMd" alignment="start">
            Preview
          </Text>
        </div>
        <div>
          <Text as="h2" variant="headingLg" alignment="center">
            {campaign}
          </Text>
          <Text as="span" variant="headingSm" alignment="start">
            {description}
          </Text>
        </div>
        <DataTable
          columnContentTypes={["text", "text", "numeric", "numeric"]}
          headings={["Title", "Discount Type", "Quantity", "Amount"]}
          rows={rows}
        />
      </Card>
    </Box>
  );
};
