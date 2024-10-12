import { Router } from 'express';
import { getUserById, getUsers, updateUser } from '../controllers/user.controller';
import HttpCodes from 'http-status-codes';
import { authenticateToken } from '../middleware/authToken.middleware';
import { getCreators } from '../controllers/creators.controller';
import { createSongs, getSongs } from '../controllers/song.controller';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/users', authenticateToken, getUsers);
router.get('/users/:userId', authenticateToken, getUserById);
router.put('/users/:userId', authenticateToken, updateUser);

router.get('/songs', authenticateToken, getSongs);
router.post('/songs', authenticateToken, upload.fields([{ name: 'song' }, { name: 'thumbnail' }]), createSongs);

router.get('/creators', authenticateToken, getCreators);

router.get('/health-check', (req, res) => {
    res.status(HttpCodes.OK).send('Server is healthy');
});

export default router;