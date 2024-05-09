import "dotenv/config";
import express from "express";
import { Students } from "./models/estudiante.model.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/estudiantes", async (req, res) => {
    try {
        const data = await Students.findAll();
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false });
    }
});

app.get("/estudiantes/:rut", async (req, res) => {
    try {
        const { rut } = req.params;
        const data = await Students.findOne(rut);
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false });
    }
});

app.post("/estudiantes", async (req, res) => {
    try {
        const { nombre, rut, curso, nivel } = req.body;
        const data = await Students.postOne(nombre, rut, curso, nivel);
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false });
    }
});

app.delete("/estudiantes/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const data = await Students.deleteOne(uid);
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false });
    }
});

app.put("/estudiantes/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const { nombre, rut, curso, nivel } = req.body;

        const data = await Students.putOne(nombre, rut, curso, nivel, uid);
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
