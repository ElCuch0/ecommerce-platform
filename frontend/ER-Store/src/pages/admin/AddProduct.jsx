import ProductForm from "../../components/inventory/ProductForm";
import ProductImages from "../../components/inventory/ProductImages";
import StockSection from "../../components/inventory/StockSection";

export default function AddProduct() {
  return (
    <div className="add-product">

      <ProductForm />

      <ProductImages />

      <StockSection />

    </div>
  );
}
