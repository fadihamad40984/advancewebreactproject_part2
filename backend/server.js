import { ApolloServer } from 'apollo-server';
import fs from 'fs';
import db from './db.js';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';


export const loadDataFromDatabaseToJson = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM villages');
    const inputData = rows; 
    const outputData = transformVillageData(inputData); 
    fs.writeFileSync('../data/villages.json', JSON.stringify(outputData, null, 2), 'utf-8'); 
    console.log('Data loaded from database into villages.json');
  } catch (err) {
    console.error('Error loading data from database:', err);
  }


  try {
    const [rows1] = await db.query('SELECT * FROM users');
    fs.writeFileSync('../data/admins.json', JSON.stringify(rows1, null, 2), 'utf-8'); 
    console.log('Data loaded from database into admins.json');
  } catch (err) {
    console.error('Error loading data from database:', err);
  }


  try {
    const [rows2] = await db.query('SELECT * FROM gallery');
    fs.writeFileSync('../data/gallery.json', JSON.stringify(rows2, null, 2), 'utf-8'); 
    console.log('Data loaded from database into gallery.json');
  } catch (err) {
    console.error('Error loading data from database:', err);
  }

  
};


loadDataFromDatabaseToJson();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

function transformVillageData(inputData) {
  const transformedData = inputData.map(village => {
    const {
      village_id: villageId,
      village_name: villageName,
      region,
      latitude,
      longitude,
      tags,
      population,
      male_population,
      female_population,
      age_0_14,
      age_15_64,
      age_65_plus,
      growth_rate,
      area,
      image_path 
    } = village;

    const totalPopulation = population;
    const ageDistribution = `0-14: ${(age_0_14 / totalPopulation * 100).toFixed(0)}%, ` +
                            `15-64: ${(age_15_64 / totalPopulation * 100).toFixed(0)}%, ` +
                            `65+: ${(age_65_plus / totalPopulation * 100).toFixed(0)}%`;

    const genderRatio = `Male: ${(male_population / totalPopulation * 100).toFixed(0)}%, ` +
                        `Female: ${(female_population / totalPopulation * 100).toFixed(0)}%`;

    return {
      villageId,
      villageName,
      region,
      landArea: area || 0, 
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      tags,
      image_path,
      demographic: {
        populationSize: totalPopulation,
        ageDistribution,
        genderRatio,
        populationRate: growth_rate
      }
    };
  });

  return transformedData;
}




server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});


