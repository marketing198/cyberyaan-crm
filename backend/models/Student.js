import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    enrollmentId: String,
    course: String,
    batch: String,

    totalFees: Number,
    paid: Number,

    emiDate: String,

    currentModule: String,
    completedModules: Number,
    pendingModules: Number,

    completionDate: String,
    status: String,

    moduleHistory: Array,
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.model(
    "Student",
    studentSchema
  );

export default Student;