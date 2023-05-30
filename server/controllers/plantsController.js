import Plant from '../models/Plant.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export const createPlant = async (req, res) => {
    try {
        const { plantname, descript } = req.body

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPlantWithImage = new Plant({
                plantname,
                descript,
                imgUrl: fileName,
            })

            await newPlantWithImage.save()

            return res.json(newPlantWithImage)
        }

        const newPlantWithoutImage = new Plant({
            plantname,
            descript,
            imgUrl: fileName,
        })
        await newPlantWithoutImage.save()

        res.json(newPlantWithoutImage)
    } catch (error) {
        res.json({ message: 'Something went wrong( --createPlant--' })
    }
}

export const getAllPlants = async (req, res) => {
    try {
        const plants = await Plant.find().sort('-createdAt')
        const popularPlants = await Plant.find().limit(5).sort('-views')

        if (!plants) {
            return res.json({ message: 'There are no plants yet\nBe the first! Share information with others!' })
        }

        res.json({ plants: plants, popularPlants })
    } catch (error) {
        res.json({ message: 'Something went wrong( --getAllPlants--' })
    }
}

export const getPlantById = async (req, res) => {
    try {
        let plant;

        if (req.query.role === 'spec') {
            plant = await Plant.findById(req.params.id);
        } else {
            plant = await Plant.findByIdAndUpdate(req.params.id, {
                $inc: { views: 1 },
            });
        }

        if (!plant) {
            return res.json({ message: 'No such plant' });
        }
        console.log(plant)
        res.json(plant);
    } catch (error) {
        res.json({ message: 'Something went wrong( --getPlantById--' })
    }
}

export const removePlant = async (req, res) => {
    try {
        const plant = await Plant.findByIdAndDelete(req.params.id)
        if (!plant) return res.json({ message: 'There is no such plant' })

        await Comment.deleteMany({ plant: plant._id })
        await UserPlants.deleteMany({ plant: plant._id });

        res.json({ message: 'Plant and associated comments were deleted' })
    } catch (error) {
        res.json({ message: 'Something went wrong' })
    }
}

export const updatePlant = async (req, res) => {
    try {
        const { plantname, descript, id } = req.body
        const plant = await Plant.findById(id)

        if (!plant) {
            return res.json({ message: 'Plant not found' })
        }

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            plant.imgUrl = fileName || ''
        }

        plant.plantname = plantname
        plant.descript = descript

        await plant.save()

        res.json(plant)
    } catch (error) {
        res.json({ message: 'Something went wrong( --updatePlant--' })
    }
}

export const getPlantComments = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id)
        const list = await Promise.all(
            plant.comments.map(async (comment) => {
                const commentData = await Comment.findById(comment.toString());
                const user = await User.findById(commentData.author);
                const username = user.username
                return { ...commentData.toJSON(), username };
            })
        );
        res.json(list)
    } catch (error) {
        res.json({ message: 'Something went wrong( --getPlantComments--' })
    }

}

export const getPlantByName = async (req, res) => {
    try {
        const plantName = req.params.plantName
        const regexPattern = new RegExp(plantName, "i"); // Флаг "i" для регистронезависимого поиска
        const plants = await Plant.find({ plantname: regexPattern });
        res.json({ plants: plants })
    } catch (error) {
        res.json({ message: 'Something went wrong( --getPlantComments--' })
    }

}