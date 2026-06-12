import CustomerInfo from "../../components/invoice/CustomerInfo";
import ProductDetailTable from "../../components/invoice/ProductDetailTable";
import InvoiceSummary from "../../components/invoice/InvoiceSummary";

export default function Invoice() {
  return (
    <>
      <h1 className="adm-page-title">Pedidos / Factura</h1>
      <p className="adm-page-subtitle">Gestión de pedidos y emisión de factura.</p>

      <div className="adm-invoice-grid">
        <div>
          <CustomerInfo />
          <ProductDetailTable />
        </div>
        <InvoiceSummary />
      </div>
    </>
  );
}
