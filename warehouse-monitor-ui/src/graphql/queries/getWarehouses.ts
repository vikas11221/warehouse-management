import { gql } from "@apollo/client";

gql`
  query Warehouses {
    warehouses {
      id
      name
      size
      hazardousProductsCount
      totalProductQuantity
    }
  }
`;
