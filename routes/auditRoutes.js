const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const { authenticateAdmin } = require('../middlewares/authMiddleware');

// Get audit logs
router.get('/logs', authenticateAdmin, auditController.getLogs);

module.exports = router;
