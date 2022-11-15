import { Schema, model } from 'mongoose';
import User from './User';

const Complaint = new Schema({
	explanation: String,
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // participants: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // }],

	dateOfComplaint: Date

});

export default model('Complaint', Complaint);