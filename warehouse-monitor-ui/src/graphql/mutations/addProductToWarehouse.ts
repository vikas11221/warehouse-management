import { gql } from "@apollo/client";

gql`
  mutation AddProductToWarehouse($input: AddProductToWarehouseInput!) {
    addProductToWarehouse(input: $input) {
      id
      name
      size
      hazardousProductsCount
      warehouseProducts {
        product {
          id
          name
          sizePerUnit
          isHazardous
          quantity
        }
        quantity
      }
    }
  }
`;
