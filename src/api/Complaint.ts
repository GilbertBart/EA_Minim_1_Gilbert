import { Router } from 'express';
import Complaint from '../model/Complaint';
import complaintController from '../controller/complaintController';

const router = Router ()
router.post('/create', complaintController.create);
router.get('/',complaintController.getAllComplaints);
router.get('/:id/',complaintController.getComplaint);
router.put('/:id',complaintController.updateComplaint);
router.delete('/:id/deleteComplaint',complaintController.deleteComplaint);

export default router;