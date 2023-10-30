import { gql } from "@apollo/client";

gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      sizePerUnit
      isHazardous
      quantity
    }
  }
`;
