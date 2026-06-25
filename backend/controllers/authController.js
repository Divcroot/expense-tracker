import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

//Generate Jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" })
}

//Register User API
export const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body

    // Validation check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be atleast 8 characters" })
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() })
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" })
        }

        //Create the user
        const user = await User.create({
            fullName,
            email: email.toLowerCase(),
            password,
            profileImageUrl,
        })

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message })
    }

}

//Login User API
export const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() }).select("+password")
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({
            id: user._id,
            user: userData,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ message: "Error in logging user", error: error.message })
    }
}

//Get User API
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res
            .status(500)
            .json({
                message: "Error registering user",
                error: err.message,
            });
    }
}