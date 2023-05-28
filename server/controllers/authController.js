import User from '../models/User.js'
import Role from '../models/Role.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register user
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log('ok')
        if (!username || !password) {
            return res.json({
                message: 'Fill in all the fields!'
            })
        }

        const isUsed = await User.findOne({ username })
        if (isUsed) {
            return res.json({ message: "Username already used"});
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ message:"Email already used"});

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const userRole = await Role.findOne({ value: 'user' })

        const newUser = new User({
            username,
            email,
            password: hash,
            role: [userRole.value]
        })

        const token = jwt.sign(
            {
                id: newUser._id,
                roles: newUser.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        await newUser.save()

        res.json({
            newUser,
            token,
            message: 'Registration completed successfully!',
        })
    } catch (error) {
        res.json({ message: 'ERROR: user registration' })
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.json({
                message: 'No such user'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Incorrect password'
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                roles: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        res.json({
            token,
            user,
            message: 'You are logged in'
        })
    } catch (error) {
        res.json({ message: 'ERROR: user sign in' })
    }
}

// Get Me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'No such user'
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            user,
            token,
        })
    } catch (error) {
        res.json({ message: 'ERROR: no access' })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.json(users)
    } catch (error) {
        res.json({ message: error })
    }
}
