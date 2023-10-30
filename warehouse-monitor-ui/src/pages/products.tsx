import React, { useState } from "react";
import {
  useProductsQuery,
  useCreateProductMutation,
} from "../graphql/generated/hooks";
import DefaultLayout from "../layouts/default.layout";

export default function Products() {
  const [showError, setShowError] = useState(false);

  const { data: products, loading, error, refetch: refetchProducts } = useProductsQuery();
  const [createProductMutation] = useCreateProductMutation();

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return "Error...";
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await createProductMutation({
        variables: {
          input: {
            name: e.target.elements.productName.value,
            quantity: Number(e.target.elements.quantity.value),
            sizePerUnit: Number(e.target.elements.sizePerUnit.value),
            isHazardous: e.target.elements.isHazardous.checked,
          },
        },
      });
      setShowError(false);
      refetchProducts();
    } catch (error: any) {
      setShowError(true);
      console.log(showError);
    }
  };

  return (
    <DefaultLayout>
      <div className="container">
        <div className="row p-5">
          <div className="col-md-6">
            <div className="h2">Add products</div>
            {showError && (
              <div className="alert alert-danger" role="alert">
                Product Name Already exists
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
                <label
                  htmlFor="sizePerUnit"
                  className="col-sm-2 col-form-label"
                >
                  Size per Unit
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    id="sizePerUnit"
                    placeholder="Size Per Unit"
                    min="1"
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
                    placeholder="Quantity"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group row pt-3">
                <div className="col-sm-2 ">Checkbox</div>
                <div className="col-sm-10">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isHazardous"
                    />
                    <label className="form-check-label" htmlFor="isHazardous">
                      Is Hazardous
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group row pt-5">
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary">
                    Add product
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="col-md-6 h2">Product List</div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Size per Unit</th>
                  <th scope="col">isHazardous</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products?.products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.sizePerUnit}</td>
                    <td>{product.isHazardous ? "Yes" : "No"}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
