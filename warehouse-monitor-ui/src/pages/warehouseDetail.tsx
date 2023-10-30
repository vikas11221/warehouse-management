import { useGetFilteredWarehousesQuery } from "../graphql/generated/hooks";

const WarehouseDetail = ({ warehouseId }: { warehouseId: string }) => {
  const { data: warehouses, loading, error } = useGetFilteredWarehousesQuery({
    variables: {
      input: { id: warehouseId },
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Warehouse Details</h2>
      {warehouses?.getFilteredWarehouses?.map((warehouse) => {
        return (
          <>
            <p>Warehouse ID: {warehouse.id}</p>
            <p>Name: {warehouse.name}</p>
            <p>Occupied Size: {warehouse.totalProductQuantity}</p>
            <p>Total Hazardous Products : {warehouse.hazardousProductsCount}</p>
          </>
        );
      })}

      <div className="col-md-6 pt-4">
        <div className="col-md-6 h2">Warehouse History</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Import / Export Quantity</th>
              <th scope="col">Is Hazardous</th>
              <th scope="col">Size Per Unit</th>
            </tr>
          </thead>
          <tbody>
            {warehouses?.getFilteredWarehouses.map((warehouse) => {
              return warehouse?.warehouseProducts?.length ? (
                warehouse?.warehouseProducts?.map((productsHistory) => {
                  return (
                    <>
                      <tr key={productsHistory?.product?.id}>
                        <td>{productsHistory.product?.name}</td>
                        <td>
                          {productsHistory?.quantity > 0 ? (
                            <div>Imported {productsHistory?.quantity}</div>
                          ) : (
                            <div>Exported {productsHistory?.quantity * -1}</div>
                          )}
                        </td>
                        <td>
                          {productsHistory.product?.isHazardous ? "Yes" : "No"}
                        </td>
                        <td>{productsHistory.product?.sizePerUnit}</td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <div>No History Found</div>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseDetail;
