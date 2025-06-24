import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    try {
        const { email, password, fullName, phone, role, location, whatsappNumber, companyName, specialities, bio, metadata } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);        const newUser = await User.create({
            email,
            password: hashedPassword,
            fullName,
            phone,
            role,
            location,
            whatsappNumber,
            companyName,
            specialities,
            bio,
            metadata
        });

        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: newUser,
                token
            }
        });
    } catch (error) {
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        // Check if req.body exists and has required fields
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: 'Request body is required'
            });
        }

        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                user,
                token
            }
        });
    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    try {
        // Invalidate the token by removing it from the client side
        res.status(200).json({
            success: true,
            message: 'User signed out successfully'
        });
    } catch (error) {
        next(error);
    }
}