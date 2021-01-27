const mongoose = require('mongoose');
const mongooseConfig = { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true };

//process.env.MONGODB_URI || 
var mongoDBPort ='mongodb://localhost:400Project/cis400test3';
// var mongoDBPort = 'mongodb+srv://admin:admin@cluster0.esxz5.mongodb.net/cis400?retryWrites=true&w=majority';


mongoose.connect(mongoDBPort, mongooseConfig);
mongoose.set('useFindAndModify', false);

var Schema = mongoose.Schema;

var studentSchema = new Schema({
    username: String,
    password: String,
    first: String,
    last: String,
    userInfo: {
        // skills info
        skillsInfo : {
          knownSkillNames: String, //String to index
          knownSkills: [Number], //skill val based on knownSkillNames index
          areasOfImprovementNames: String, //String to index
          areasOfImprovement: [Number],
          skillsToTeachNames: String, //String to index
          skillsToTeach: [Number]
        },

        // personal goals - these are all single value attributes
        personalGoals : {
          grade: Number,
          learningSkills: Number,
          makeImpact: Number,
          meetingPeople: Number,
          makeProduct: Number
        },
        
        // personal traits - these are all single value attributes
        personalTraits : {
          quiteness: Number,
          contribution: Number,
          leaderPosition: Number,
          communicationFrequency: Number,
          proactivityLevel: Number,
        }
      }
});

var groupSchema = new Schema({
    class_string: String,
    students: [String] 
});


const StudentModel = mongoose.model('Student', studentSchema);
const GroupModel = mongoose.model('Group', groupSchema);


var database = {Student: StudentModel,
    Group: GroupModel};

module.exports = database;
