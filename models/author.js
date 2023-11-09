const {DateTime} = require("luxon")
const mongoose = require('mongoose');

// Since we are using one file per modal, there is no need to give specific
// variable names to the schema.  e.g. no need to use 'AuthorSchema'
const schema = new mongoose.Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
schema.virtual('name').get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = '';
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  return fullname;
});

// Virtual for author's URL
schema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

schema.virtual('lifespan').get(function () {
  const date_of_birth_formmated = this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : '';
  const date_of_death_formmated = this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : '';
  return date_of_birth_formmated + ' - ' + date_of_death_formmated;
});

// The first argument is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model
// name. Thus, for the example above, the model Tank is for the tanks collection
// in the database.
// e.g. the collection that mongoose creates is 'authors'
module.exports = mongoose.model('Author', schema);
