const { gql, ApolloClient, InMemoryCache, HttpLink } = require('@apollo/client');
const fetch = require('cross-fetch');
const fs = require('fs');

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/', fetch }),
  cache: new InMemoryCache(),
});

const mapVillageData = (village) => ({
  village_name: village.villageName,
  region: village.region,
  latitude: village.latitude,
  longitude: village.longitude,
  tags: village.tags,
  population: village.demographic.populationSize,
  male_population: Math.round(village.demographic.populationSize * (parseInt(village.demographic.genderRatio.split(': ')[1]) / 100)),
  female_population: Math.round(village.demographic.populationSize * (parseInt(village.demographic.genderRatio.split(': ')[3]) / 100)),
  age_0_14: Math.round(village.demographic.populationSize * (parseInt(village.demographic.ageDistribution.split(': ')[1]) / 100)),
  age_15_64: Math.round(village.demographic.populationSize * (parseInt(village.demographic.ageDistribution.split(': ')[3]) / 100)),
  age_65_plus: Math.round(village.demographic.populationSize * (parseInt(village.demographic.ageDistribution.split(': ')[5]) / 100)),
  growth_rate: village.demographic.populationRate,
});

const syncVillages = async () => {
const villages = JSON.parse(fs.readFileSync('../data/villages.json', 'utf-8'));


  for (const village of villages) {
    const response = await client.mutate({
      mutation: gql`
        mutation UpsertVillage($data: VillageInput!) {
          upsertVillage(data: $data) {
            village_name
          }
        }
      `,
      variables: {
        data: mapVillageData(village),
      },
    });

    console.log('Synced:', response.data.upsertVillage.village_name);
  }
};

syncVillages();
