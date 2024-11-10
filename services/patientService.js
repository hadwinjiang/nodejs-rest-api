import { readData, writeData, generateUniqueId } from "../helpers.js";

async function getAllPatients(){
    return await readData();
}

async function getPatientById(id) {
    const patients = await readData();
    const patient = patients.find(patient => patient.id === id);
    if(!patient) throw new Error('notfound');
    return patient;
}

async function createNewPatient(patient) {
    const patients = await readData();
    const newId = await generateUniqueId();
    const newPatient = { ...patient, id: newId };
    patients.push(newPatient);
    await writeData(patients);
    return newPatient;
}

async function updatePatient(id, updatedPatient) {
    const patients = await readData();
    const index = patients.findIndex(patient => patient.id === id);
    if (index === -1) {
        throw new Error('Patient not found');
    }
    patients[index] = { ...patients[index], ...updatedPatient };
    await writeData(patients);
    return patients[index];
}

async function deletePatient(id) {
    const patients = await readData();
    const index = patients.findIndex(patient => patient.id === id);
    if (index === -1) {
        throw new Error('Patient not found');
    }
    patients.splice(index, 1);
    await writeData(patients);
}

export {
    getAllPatients,
    getPatientById,
    createNewPatient,
    updatePatient,
    deletePatient
}