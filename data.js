const mongoose = require('mongoose');

const { Schema } = mongoose;

const DataSchema = new Schema(
  {
    id: Number,
    search_text: String,
  },
  { timestamps: true },
);
