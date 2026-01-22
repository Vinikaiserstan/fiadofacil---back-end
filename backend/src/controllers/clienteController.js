import { db } from "../config/firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const clienteController = {
    // CREATE - Novo Cliente
    async criar(req, res) {
        try {
            const { nome, telefone } = req.body;
            if (!nome) return res.status(400).json({ error: "Nome é obrigatório." });

            const docRef = await addDoc(collection(db, "clientes"), { nome, telefone });
            res.status(201).json({ id: docRef.id, nome, telefone });
        } catch (error) {
            res.status(500).json({ error: "Erro ao cadastrar cliente." });
        }
    },

    // READ - Listar Clientes
    async listar(req, res) {
        try {
            const snapshot = await getDocs(collection(db, "clientes"));
            const clientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar clientes." });
        }
    }
};