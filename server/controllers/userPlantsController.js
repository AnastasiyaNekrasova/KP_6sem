import Plant from "../models/Plant.js";
import User from "../models/User.js";
import UserPlants from "../models/UserPlants.js";

export const addPlantToUser = async (req, res) => {
  try {
    const { userId, plantId } = req.body;
    const existingPlant = await UserPlants.findOne({
      user: userId,
      plant: plantId,
    });

    if (existingPlant) {
      return res.json({ message: "User already has this plant" });
    }

    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.json({ message: "Plant not found." });
    }

    const watering = Date.now()

    const newUserPlant = new UserPlants();

    newUserPlant.user = userId;
    newUserPlant.plant = plantId;
    newUserPlant.watering = watering;

    await newUserPlant.save();
    const lastWatering = newUserPlant.watering

    return res.json({message:'You succesfully added plant to yours list', plant: { ...plant, lastWatering }});
  } catch (error) {
    res.json({ message: "Something went wrong( --createUserPlant--" });
  }
};

export const getUserPlants = async (req, res) => {
  try {
    const userId = req.query.userId;
    const userPlants = await UserPlants.find({ user: userId });

    if (!userPlants) {
      return res.json({ message: "You haven't add any plants yet" });
    }

    const plantIds = userPlants.map((userPlant) => {
      return userPlant.plant;
    });
    const plants = await Plant.find({ _id: { $in: plantIds } });

    const updatedPlants = plants.map((plant) => {
      const userPlant = userPlants.find((userPlant) => userPlant.plant.equals(plant._id));
      return { ...plant._doc, lastWatering: userPlant?.watering, interval: userPlant?.interval };
    });
    return res.json({ plants: updatedPlants});
  } catch (error) {
    res.json({ message: "Something went wrong( --getUserPlants--" });
  }
};

export const removeUserPlant = async (req, res) => {
  try {
    const { userId, plantId } = req.params;

    const userPlant = await UserPlants.findOneAndDelete({
      user: userId,
      plant: plantId,
    });

    if (!userPlant) {
      return res.json({ message: "User doesn't have such a plant" });
    }

    return res.json({ message: "Plant was deleted from your storage" });
  } catch (error) {
    res.json({ message: "Something went wrong( --removeUserPlant--" });
  }
};

export const changeLastWatering = async (req, res) => {
  try {
    const { userId, plantId} = req.body;
    const watering = Date.now()

    const userPlant = await UserPlants.findOneAndUpdate(
      { user: userId, plant: plantId },
      { $set: {watering: watering} }
    );

    if (!userPlant) {
      return res.json({ message: "User doesn't have such a plant" });
    }
    return res.json({ message: "You'he just watered your plant!!!", watering:userPlant.watering });
  } catch (error) {
    res.json({ message: "Something went wrong( --changeLastWatering--" });
  }
};

export const changeWateringInterval = async (req, res) => {
  try {
    const { userId, plantId, interval } = req.body;

    const userPlant = await UserPlants.findOneAndUpdate(
      { user: userId, plant: plantId },
      { $set: {interval: interval} }
    );
    if (!userPlant) {
      return res.json({ message: "User doesn't have such a plant", interval:userPlant.interval  });
    }

    res.status(200).json({ message: "You'he just changed watering interval" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong( --changeWateringInterval--" });
  }
};

