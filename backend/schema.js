/* import { gql } from 'apollo-server';

const typeDefs = gql`
  type Village {
    village_id: ID!
    village_name: String!
    region: String!
    latitude: Float
    longitude: Float
    tags: String
    population: Int
    male_population: Int
    female_population: Int
    age_0_14: Int
    age_15_64: Int
    age_65_plus: Int
    growth_rate: Float
    created_at: String
    updated_at: String
  }

  input VillageInput {
    village_name: String!
    region: String!
    latitude: Float
    longitude: Float
    tags: String
    population: Int
    male_population: Int
    female_population: Int
    age_0_14: Int
    age_15_64: Int
    age_65_plus: Int
    growth_rate: Float
  }

  type Query {
    villages: [Village]
    village(village_id: ID!): Village
  }

  type Mutation {
    upsertVillage(data: VillageInput!): Village
  }
`;

export default typeDefs; 

 */

import { gql } from 'apollo-server';

const typeDefs = gql`


type Village {
  villageName: String!
  region: String!
  latitude: Float
  longitude: Float
  tags: String
  population: Int
  male_population: Int
  female_population: Int
  age_0_14: Int
  age_15_64: Int
  age_65_plus: Int
  growth_rate: Float
  area: Int
}


  type Village1 {
    area: Float
    villageName: String!
    region: String!
    latitude: Float
    longitude: Float
    tags: String
    demographic: Demographic
  }

  type Demographic {
    populationSize: Int
    ageDistribution: String
    genderRatio: String
    populationRate: Float
  }

  input VillageInput {
    villageName: String!
    region: String!
    area: Float
    latitude: Float
    longitude: Float
    tags: String
    male_population: Int
    female_population: Int
    age_0_14: Int
    age_15_64: Int
    age_65_plus: Int
    growth_rate: Float
  }


  input VillageInputDemographic {
    male_population: Int
    female_population: Int
    age_0_14: Int
    age_15_64: Int
    age_65_plus: Int
    growth_rate: Float
  }


  type Village2 {
    male_population: Int
    female_population: Int
    age_0_14: Int
    age_15_64: Int
    age_65_plus: Int
    growth_rate: Float
  }



  type Mutation {
    addVillage(input: VillageInput!): Village1
    updateVillage(id: ID!, input: VillageInput!): Village1
    deleteVillage(id: ID!): Boolean
    updateDemographic(id: ID!, input: VillageInputDemographic!): Village2
  }

  type Query {
    villages: [Village]
  }
`;

export default typeDefs;
