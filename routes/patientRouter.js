import express from "express";
const router = express.Router();

import { getAllPatients, 
    getPatientById, 
    createNewPatient, 
    updatePatient,
    deletePatient } from "../services/patientService.js";

// GET /patients
router.get('/', async (req, res, next) => {
    // Log all headers
    console.log(req.headers);
    
    try {
        const patients = await getAllPatients();
        // throw new Error("bad error");
        
        res.status(200).json(patients);
    } catch (error) {
        next(error);
    }
});

// GET /patients/:id
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const patient = await getPatientById(id)
        // if (!patient) {
        //     // console.error(`Patient not found for ID: ${id}`);
        //     return res.status(404).json({ error: "Patient not found." });
        // }
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
});

// POST /patients
router.post('/', async (req, res, next) => {
    try {
        const newPatient = req.body;
        const patient = await createNewPatient(newPatient);
        res.status(201).json(patient);
    } catch (error) {
        next(error);
    }
});

// PUT /patients/:id
router.put('/:id', async (req, res, next) => {
    try {
        const updatedPatient = req.body;
        const patient = await updatePatient(req.params.id, updatedPatient);
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
})

// DELETE //patients"/:id
router.delete('/:id', async (req, res, next) => {
    try {
        await deletePatient(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
})

export default router;