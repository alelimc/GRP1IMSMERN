import mongoose from 'mongoose' 

const incidentSchema = new mongoose.Schema({
  title: {type: String, required: true},
  category: { type: String, required: true },
  severity: { type: String, required: true, enum: ['low', 'medium', 'high', 'Low', 'Medium', 'High'] },
  description: { type: String, required: true },
  comments: { type: String },
  reportedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  status: { type: String, enum: ['open', 'closed', 'in progress', 'Open', 'Closed', 'In Progress'],default: 'Open' },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
  
});

const Incident = mongoose.model('Incident', incidentSchema)
export default Incident;

