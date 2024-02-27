import { mongoose } from '../config/mongoose.js';

const donorSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    reference: {
        type: String,
        required: true
    }
});

const Donor = mongoose.model('Donor', donorSchema);

export default { Donor };
