import { gql } from "@apollo/client";

gql`
  query Products {
    products {
      id
      name
      sizePerUnit
      isHazardous
      quantity
    }
  }
`;
