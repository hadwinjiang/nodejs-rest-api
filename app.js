import express from 'express';
// import { getAllPatients, getPatientById } from "./services/patientService.js";
import patientRouter from "./routes/patientRouter.js";

const app = express(); 

app.use(express.json());
app.use('/patients', patientRouter);

// app.get('/', (req, res) => {
//     res.send("Hello from Express!")
// }) 

app.use((err, req, res, next) => {
    console.error(err);
    if (err.message === 'notfound') {
        return res.status(404).json({error: 'Sorry, cannot find that!'});
    } else {
        res.status(500).json({
            error: 'Something internal server broke!'
        });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});