/* eslint-disable @typescript-eslint/no-explicit-any */
export const saveDiscount = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Saved discount:", data);
      resolve(data);
    }, 1000);
  });
};
