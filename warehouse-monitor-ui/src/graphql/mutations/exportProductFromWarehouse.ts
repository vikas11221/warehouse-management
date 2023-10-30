import { gql } from "@apollo/client";

gql`
  mutation ExportProductFromWarehouse(
    $input: ExportProductFromWarehouseInput!
  ) {
    exportProductFromWarehouse(input: $input) {
      id
      name
      size
      hazardousProductsCount
      totalProductQuantity
      warehouseProducts {
        quantity
        product {
          id
          name
          sizePerUnit
          isHazardous
          quantity
        }
      }
    }
  }
`;
