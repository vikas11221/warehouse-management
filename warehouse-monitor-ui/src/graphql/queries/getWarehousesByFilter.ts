import { gql } from "@apollo/client";

gql`
  query GetFilteredWarehouses($input: WarehouseFilter!) {
    getFilteredWarehouses(input: $input) {
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
