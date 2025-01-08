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

type User {
  name: String!
  password: String!
  role: String!
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
    imagePath: String
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


   input ImageInput{
    imagePath: String!
    imageDescription: String!
   }



   input userInput {
  name: String!
  user_name: String!
  password: String!
}



  type Mutation {
    addVillage(input: VillageInput!): Village1
    updateVillage(id: ID!, input: VillageInput!): Village1
    deleteVillage(id: ID!): Boolean
    updateDemographic(id: ID!, input: VillageInputDemographic!): Village2
    addImage(input: ImageInput!): Boolean
    addUser(input: userInput!): Boolean
  }

  type Query {
    villages: [Village]
  }
`;

export default typeDefs;
