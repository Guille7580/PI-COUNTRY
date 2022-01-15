
const { Country, Activity } = require("../db");

async function newAct(req, res) {
  const { name, difficulty, duration, season, countryID } = req.body;

  const valdidateact = await Activity.findOne({
    where: {
      name: name,
    },
  });

  if (!valdidateact) {
    const addAct = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
    });
    const countrymatch = await Country.findAll({
      where: {
        name: countryID,
      },
    });

    const resact = await addAct.addCountries(countrymatch);

    return res.send(resact);
  }

  const countrymatch = await Country.findAll({
    where: {
      id: countryID,
    },
  });
  // console.log(addAct)
  // console.log(countrymatch)

  const resact = await valdidateact.addCountries(countrymatch);

  res.send(resact);
}
async function getAllActivities(req, res) {
  

  try {
    
      const ActivityAll = await Activity.findAll({ include: Country});
      res.send(ActivityAll);
    
  } catch (error) {
    res.send(error);
  }
}

module.exports = { newAct ,getAllActivities };
