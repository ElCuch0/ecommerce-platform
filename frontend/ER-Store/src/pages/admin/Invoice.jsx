import CustomerInfo from "../../components/invoice/CustomerInfo";
import ProductDetailTable from "../../components/invoice/ProductDetailTable";
import InvoiceSummary from "../../components/invoice/InvoiceSummary";

export default function Invoice() {
  return (
    <>
      <CustomerInfo />
      <ProductDetailTable />
      <InvoiceSummary />
    </>
  );
}
