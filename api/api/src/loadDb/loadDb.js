const axios = require ('axios');
const { Country, } = require ('../db')
const { API_ALL } = process.env;

async function LoadDb(req, res) {
  try {
    {
      // await axios.get(API_ALL)
      // .then((response)=>response.json)
      // .then((data)=>console.log(data))
      const AllCountApi = await axios.get(API_ALL);
      const ModelCountries = AllCountApi.data.map((e) => {
        return {
          name: e.name.common,
          id: e.cca3,
          flagimg: e.flags[1] ? e.flags[1]: 'Image not found',
          region: e.region,
          capital:e.capital ? e.capital[0] : "capital not found",
          subregion: e.subregion ? e.subregion : "subregion not found",
          area: e.area  ? parseInt(e.area) : 0,
          population: e.population ? e.population : 0,
        };
      });
      ModelCountries.forEach(async (e) => {
        await Country.findOrCreate({
          where: {
            name: e.name,
            id: e.id,
            flagimg: e.flagimg,
            region: e.region,
            capital: e.capital,
            subregion: e.subregion,
            area: e.area,
            population: e.population,
          },
        });
      });
    }
    console.log('DB success')
  } catch (error) {
    res.send(error);
  }
}
module.exports= {LoadDb}
