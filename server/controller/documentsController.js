import document from "../models/DocumentModel.js";

export const createDocument = async (req, res) =>{
    try {
        const newDoc = new document({ content: "", title: "Untitled" });
        await newDoc.save();
        res.json(newDoc);
    } catch (err) {
        res.status(500).json({ message: "Error creating document" });
    }
}

export const getDocumentById = async (req, res) =>{
    try {
        const doc = await document.findById(req.params.id);
        if (!doc) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.json(doc);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}