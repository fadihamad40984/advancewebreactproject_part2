import db from './db.js';
import {loadDataFromDatabaseToJson} from './server.js';

const resolvers = {
  Query: {
    async villages() {
      const [rows] = await db.query('SELECT * FROM villages');
      return rows.map(row => ({
        villageName: row.village_name,
        region: row.region,
        latitude: row.latitude,
        longitude: row.longitude,
        tags: row.tags,
        population: row.population,
        male_population: row.male_population,
        female_population: row.female_population,
        age_0_14: row.age_0_14,
        age_15_64: row.age_15_64,
        age_65_plus: row.age_65_plus,
        growth_rate: row.growth_rate,
        area: row.area
      }));
    },
  },
  Mutation: {
    async addVillage(_, { input }) {
      try {

        const {
          villageName,
          region,
          area,
          latitude,
          longitude,
          tags,
          male_population,
          female_population,
          age_0_14,
          age_15_64,
          age_65_plus,
          growth_rate,
        } = input;

        const [result] = await db.query(
          `INSERT INTO villages (village_name, region, area, latitude, longitude, tags, male_population, female_population, age_0_14, age_15_64, age_65_plus, growth_rate)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            villageName,
            region,
            area,
            latitude,
            longitude,
            tags,
            male_population,
            female_population,
            age_0_14,
            age_15_64,
            age_65_plus,
            growth_rate,
          ]
        );
        loadDataFromDatabaseToJson();        
        return {
          villageName,
          region,
          area,
          latitude,
          longitude,
          tags,
          demographic: {
            populationSize: male_population + female_population,
            ageDistribution: `0-14: ${(age_0_14 / (male_population + female_population) * 100).toFixed(0)}%, 15-64: ${(age_15_64 / (male_population + female_population) * 100).toFixed(0)}%, 65+: ${(age_65_plus / (male_population + female_population) * 100).toFixed(0)}%`,
            genderRatio: `Male: ${(male_population / (male_population + female_population) * 100).toFixed(0)}%, Female: ${(female_population / (male_population + female_population) * 100).toFixed(0)}%`,
            populationRate: growth_rate,
          },
        };
      } catch (error) {
        console.error('Error adding village:', error);
        throw new Error('Failed to add village');
      }
    },



    async updateVillage(_, { id, input }) {
      try {
        const {
          villageName,
          region,
          area,
          latitude,
          longitude,
        } = input;
  
        const [result] = await db.query(
          `UPDATE villages
           SET village_name = ?, region = ?, area = ?, latitude = ?, longitude = ?
          WHERE village_id = ?;`,
          [
            villageName,
            region,
            area,
            latitude,
            longitude,
            id, 
          ]
        );
  
        
        loadDataFromDatabaseToJson();
        return {
          villageName,
          region,
          area,
          latitude,
          longitude,
        };
      } catch (error) {
        console.error('Error updating village:', error);
        throw new Error('Failed to update village');
      }
    },


    async deleteVillage(_, { id }) {
      try {
        const [result] = await db.query(
          `DELETE FROM villages WHERE village_id = ?;`,
          [id]
        );
    
        if (result.affectedRows === 0) {
          throw new Error('Village not found');
        }
    
        console.log(`Village with ID ${id} deleted successfully.`);
        
        loadDataFromDatabaseToJson();
    
        return true; 
      } catch (error) {
        console.error('Error deleting village:', error);
        throw new Error('Failed to delete village');
      }
    },
    

     async updateDemographic(_, { id, input }) {
      try {
        const {
          male_population,
          female_population,
          age_0_14,
          age_15_64,
          age_65_plus,
          growth_rate,
        } = input;
  
        const [result] = await db.query(
          `UPDATE villages
           SET population = ? , male_population = ?, female_population = ?, age_0_14 = ?, age_15_64 = ? , age_65_plus = ? , growth_rate = ? 
          WHERE village_id = ?;`,
          [
            (male_population+female_population),
            male_population,
            female_population,
            age_0_14,
            age_15_64,
            age_65_plus,
            growth_rate,
            id, 
          ]
        );
  
        
        loadDataFromDatabaseToJson();
  
        return {
          male_population,
          female_population,
          age_0_14,
          age_15_64,
          age_65_plus,
          growth_rate,
        };
      } catch (error) {
        console.error('Error updating village:', error);
        throw new Error('Failed to update village');
      }
    }, 

  },
};

export default resolvers;
