import { AppProvider } from "@shopify/polaris";
import "./App.css";
import { VolumeDiscountForm } from "./components/VolumeDiscountForm";

function App() {
  return (
    <AppProvider i18n={{}}>
      <VolumeDiscountForm />
    </AppProvider>
  );
}

export default App;
