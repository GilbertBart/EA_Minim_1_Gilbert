
import Complaint from '../model/Complaint';
// import Point from '../model/Point';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../model/User';
import { exec } from 'child_process';

// CREATE NEW COMPLAINT (DONE)

const create = async (req: Request, res: Response) => {
	const  explanation = req.body.explanation;

	const creator = await User.findOne({name: req.body.creator});
	// const participants = [req.body.participants];


	const dateOfComplaint = req.body.dateOfComplaint;
	const newComplaint = new Complaint({ explanation, creator, dateOfComplaint});

	await newComplaint.save();
	// creator?.route.push(newRoute._id);
	creator?.save();
	 await newComplaint.save();
	res.status(200).json( {message: "Complaint created", newComplaint} );
};


// GET ALL COMPLAINTS (DONE)

const getAllComplaints = async (req: Request, res: Response) => {
	const routes = await Complaint.find().populate('creator');
	res.json(routes);
};




// GET A COMPLAINT BY ID (DONE)

const getComplaint = async (req: Request, res: Response) => {
	const complaint = await Complaint.findById(req.params.id).populate('creator');
	res.json(complaint);
};



// UPDATE A COMPLAINT BY ID (DONE)

const updateComplaint = async (req: Request, res: Response) => {
	const updatedComplaint = await Complaint.findById(req.params.id);
	if (!updatedComplaint) {
		return res.status(404).send('No complaint found.');
	}
	else{
		updatedComplaint.explanation = req.body.explanation;
		updatedComplaint.creator = req.body.creator;
		updatedComplaint.dateOfComplaint= req.body.dateOfComplaint;
		await updatedComplaint.save();
		res.json({ status: 'Complaint Updated' });
	}
};

// DELETE COMPLAINT

const deleteComplaint = async (req: Request, res: Response) => {
	const complaint = req.body.route;
	const findComplaint = await Complaint.findOne(complaint);
	if (!findComplaint) {
		return res.status(400).json({ message: 'Complaint not found.' });
	}
	await Complaint.findByIdAndDelete(findComplaint._id);
	res.status(200).json({ auth: true });
};

export default{
	create,
	getAllComplaints,
	updateComplaint,
	deleteComplaint,
	getComplaint
};