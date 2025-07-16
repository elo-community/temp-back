import { Router } from 'express';
import * as ctrl from '../controllers/address.controller';

const router = Router();
router.post('/', ctrl.createAddress);
router.get('/', ctrl.getAllAddress);
router.get('/:id', ctrl.getAddressById);
router.put('/:id', ctrl.updateAddress);
router.delete('/:id', ctrl.deleteAddress);

export default router; 