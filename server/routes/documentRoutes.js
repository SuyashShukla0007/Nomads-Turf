import express from 'express';
const router = express.Router();

import { createDocument, getDocumentById } from '../controller/documentsController.js';

router.post('/create', createDocument);
router.get('/:id', getDocumentById);

export default router;