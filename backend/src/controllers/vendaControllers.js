import { db } from "../config/firebase.js";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

export const vendaController = {
    // CREATE - Criar venda
    async criar(req, res) {
        try {
            const { cliente, valor, descricao, dataVencimento } = req.body;
            
            // Validação de entrada (Requisito 4)
            if (!cliente || !valor) {
                return res.status(400).json({ error: "Cliente e valor são obrigatórios." });
            }

            const novaVenda = { 
                cliente, 
                valor: parseFloat(valor), 
                descricao, 
                dataVencimento, 
                criadoEm: new Date() 
            };

            const docRef = await addDoc(collection(db, "vendas"), novaVenda);
            res.status(201).json({ id: docRef.id, ...novaVenda });
        } catch (error) {
            res.status(500).json({ error: "Erro ao salvar venda no servidor." });
        }
    },

    // READ - Listar todas
    async listar(req, res) {
        try {
            const snapshot = await getDocs(collection(db, "vendas"));
            const vendas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(vendas);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar vendas." });
        }
    },

    // UPDATE - Editar venda (Requisito 2)
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const vendaRef = doc(db, "vendas", id);
            
            // Verifica se existe (Requisito 4)
            const docSnap = await getDoc(vendaRef);
            if (!docSnap.exists()) {
                return res.status(404).json({ error: "Venda não encontrada." });
            }

            await updateDoc(vendaRef, req.body);
            res.status(200).json({ message: "Venda atualizada com sucesso." });
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar venda." });
        }
    },

    // DELETE - Excluir venda (Requisito 2)
    async excluir(req, res) {
        try {
            const { id } = req.params;
            const vendaRef = doc(db, "vendas", id);
            
            await deleteDoc(vendaRef);
            res.status(200).json({ message: "Venda excluída com sucesso." });
        } catch (error) {
            res.status(500).json({ error: "Erro ao excluir registro." });
        }
    }
};