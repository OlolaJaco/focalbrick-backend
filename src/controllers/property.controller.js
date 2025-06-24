import { Property } from '../models/property.model.js';

// Create a new property
export const createProperty = async (req, res) => {
    try {
        const property = new Property(req.body);
        await property.save();
        res.status(201).json({
            success: true,
            data: property,
            message: 'Property created successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all properties
export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get property by ID
export const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get property by slug
export const getPropertyBySlug = async (req, res) => {
    try {
        const property = await Property.findOne({ slug: req.params.slug });
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update property
export const updateProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        res.status(200).json({
            success: true,
            data: property,
            message: 'Property updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete property
export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Property deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};