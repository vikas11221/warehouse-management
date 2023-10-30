import React, { useState } from "react";
import {
  useProductsQuery,
  useWarehousesQuery,
  useAddProductToWarehouseMutation,
  useExportProductFromWarehouseMutation,
} from "../graphql/generated/hooks";
import DefaultLayout from "../layouts/default.layout";
import WarehouseDetail from "./warehouseDetail";

export default function Warehouses() {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [submitType, setSubmitType] = useState("");

  const { data: products, loading, error } = useProductsQuery();

  const [addProductToWarehouseMutation] = useAddProductToWarehouseMutation();
  const [exportProductFromWarehouseMutation] =
    useExportProductFromWarehouseMutation();

  const {
    data,
    loading: warehousesloading,
    error: warehouseserror,
    refetch: refetchWarehouses,
  } = useWarehousesQuery();

  const handleImport = () => {
    setSubmitType("import");
  };

  const handleExport = () => {
    setSubmitType("export");
  };

  if (warehousesloading) {
    return "Loading...";
  }

  if (warehouseserror) {
    return "Error...";
  }

  const handleWarehouseSelect = (warehouseId: string, e: any) => {
    e.preventDefault();

    setSelectedWarehouse(warehouseId);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const warehouseId = data?.warehouses.find(
      (warehouse) => warehouse.name == e.target.elements.warehouseName.value
    )?.id;
    const productId = products?.products.find(
      (product) => product.name == e.target.elements.productName.value
    )?.id;

    if (warehouseId && productId && e.target.elements.quantity.value) {
      try {
        if (submitType == "import") {
          await addProductToWarehouseMutation({
            variables: {
              input: {
                warehouseId,
                productId,
                quantity: Number(e.target.elements.quantity.value),
              },
            },
          });
        } else if (submitType == "export") {
          await exportProductFromWarehouseMutation({
            variables: {
              input: {
                warehouseId,
                productId,
                quantity: Number(e.target.elements.quantity.value),
              },
            },
          });
        }

        setErrorMessage("");
        refetchWarehouses();
      } catch (error: any) {
        setErrorMessage(error?.message);
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="container">
        <div className="row p-5">
          <div className="col-md-6">
            <div className="h2">Add products</div>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <label
                  htmlFor="productName"
                  className="col-sm-2 col-form-label"
                >
                  Product Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="Product Name"
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="quantity" className="col-sm-2 col-form-label">
                  Quantity
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    placeholder="Size Per Unit"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group row pt-4">
                <label
                  htmlFor="warehouseName"
                  className="col-sm-2 col-form-label"
                >
                  Warehouse Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="warehouseName"
                    placeholder="Warehouse Name"
                    required
                  />
                </div>
              </div>

              <div className="form-group row pt-5">
                <div className="col-sm-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleImport}
                  >
                    Import
                  </button>
                
                </div>
                <div className="col-sm-10">
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleExport}
                  >
                    Export
                  </button>
                  </div>
              </div>
            </form>
          </div>

          <div className="col-md-6">
            <div className="col-md-6 h2">Warehouse List</div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Size</th>
                  <th scope="col">Occupied Size</th>
                  <th scope="col">Total Hazardous Products</th>
                </tr>
              </thead>
              <tbody>
                {data?.warehouses.map((warehouse) => (
                  <tr
                    key={warehouse.id}
                    onClick={handleWarehouseSelect.bind(null, warehouse.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{warehouse.name}</td>
                    <td>{warehouse.size}</td>
                    <td>{warehouse.totalProductQuantity}</td>
                    <td>{warehouse.hazardousProductsCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-md-12 pt-5">
            {selectedWarehouse && (
              <WarehouseDetail
                warehouseId={selectedWarehouse}
              ></WarehouseDetail>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}


