const db = require('../models/database.js');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// session username
var sessionUsername = "";

/*
 * Route for getting a particular user's login information
 */
var getUser = function (req, res) {
    getUserHelper(req, res)
}

/*
 * Helper function for the getUser route
 */
async function getUserHelper(req, res) {
    const User_gotten = await Student.findOne({ name: req.body.User_name });
    res.json(User_gotten)
}

// var postUser = function(req, res) {
//     postUserHelper(req, res)
// }

// async function postUserHelper(req, res) {
//     console.log("Putting: " + req.body.name);
    
// 	const newPerson = new Student({
// 		name: req.body.name,
// 		password: "",
// 		school: req.body.school,
//         class_string: req.body.class_string,
//         number_preferences: req.body.number_preferences,
//         picture: "",
//         userInfo: {

//             skillsInfo : {
//               knownSkillNames: JSON.stringify({}),
//               knownSkills: [], 
//               areasOfImprovementNames: JSON.stringify({}), 
//               areasOfImprovement: [],
//               skillsToTeachNames: JSON.stringify({}), 
//               skillsToTeach: []
//             },
    
//             personalGoals : {
//               grade: -1,
//               learningSkills: -1,
//               makeImpact: -1,
//               meetingPeople: -1,
//               makeProduct: -1
//             },
            
//             personalTraits : {
//               quiteness: -1,
//               contribution: -1,
//               leaderPosition: -1,
//               communicationFrequency: -1,
//               proactivityLevel: -1
//             }
//           }
// 	});
// 	newPerson.save();
//     console.log('New person inserted');
//     res.sendStatus(200);
// }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO: Hash password////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
 * Route for login authentication.
 */
var checkLogin = function(req, res) {
    checkLoginHelper(req, res);
}

/*
 * Helper function for checkLogin route
 */
async function checkLoginHelper(req, res) {
    const User_gotten = await db.Student.find({ 
        username: req.params.username, 
        password: req.params.password 
    });

    // send appropriate response based on whether login was successful
    if (User_gotten.length == 1) {
        sessionUsername = req.params.username;
        console.log("Log In Successful")
        res.json(User_gotten[0]);
    } else {
        console.log("Log In Unsuccessful")
        res.sendStatus(401);
    }
    
}

/*
 * Route for signing up, i.e. creating, a new user and adding 
 * them to the Database
 */
var signUp = function(req, res) {
    signUpHelper(req, res)
}

/*
 * Helper function for creating and adding a new user to the database 
 */
async function signUpHelper(req, res) {
    const newPerson = new db.Student({
        username: req.params.username,
        password: req.params.password,
        first: req.params.first,
        last: req.params.last,

        userInfo: {
            skillsInfo : {
              knownSkillNames: "{}",
              knownSkills: [],
              areasOfImprovementNames: "{}",
              areasOfImprovement: [],
              skillsToTeachNames: "{}",
              skillsToTeach: []
            },
    
            personalGoals : {
              grade: -1,
              learningSkills: -1,
              makeImpact: -1,
              meetingPeople: -1,
              makeProduct: -1
            },
            
            personalTraits : {
              quiteness: -1,
              contribution: -1,
              leaderPosition: -1,
              communicationFrequency: -1,
              proactivityLevel: -1,
            }
          }
	});
	newPerson.save();
    console.log('New person inserted');
    sessionUsername = req.params.username;
    res.json({Message : "Success"});
}

/* 
 * Route for updating user information based on questionaire on front-end
 */
var updateUserInfo = function(req, res) {
    console.log("User info updates!");
    updateUserInfoHelper(req, res);
}

/*
 * Helper function for updateUserInfo route
 */
async function updateUserInfoHelper(req, res) {
    await db.Student.updateOne({"username": req.params.username}, 
    {$set: {"userInfo.skillsInfo.knownSkillNames": JSON.stringify(req.body.skillsInfo.knownSkillNames),
           "userInfo.skillsInfo.knownSkills":req.body.skillsInfo.knownSkills,
           "userInfo.skillsInfo.areasOfImprovementNames": JSON.stringify(req.body.skillsInfo.areasOfImprovementNames),
           "userInfo.skillsInfo.areasOfImprovement": req.body.skillsInfo.areasOfImprovement,
           "userInfo.skillsInfo.skillsToTeachNames": JSON.stringify(req.body.skillsInfo.skillsToTeachNames),
           "userInfo.skillsInfo.skillsToTeach": req.body.skillsInfo.skillsToTeach,
           "userInfo.personalGoals": req.body.personalGoals,
           "userInfo.personalTraits": req.body.personalTraits
        }
    });
}

/*
 * Route for getting the currently logged in user
 */
function getSession(req, res) {
    res.json({user: sessionUsername});
}

/*
 * Route for logging out the current user. It 
 * resets the session username
 */
function logout(req, res) {
    sessionUsername="";
    res.json({});
}

/*
 * Route for running the recommendation algorithm nad getting the recommended users
 */
function getRecs(req, res) {
    getRecsHelper(req, res);
}

/*
 * Helper function for the getRecs route
 */
async function getRecsHelper(req, res) {
    // get the currently logged in user's information
    const dbUser = await db.Student.find({username: sessionUsername}, {_id: 0, userInfo: 1});
    var currUser = dbUser[0].userInfo.skillsInfo;
    var currUserPersonalGoals = dbUser[0].userInfo.personalGoals;
    var currUserPersonalTraits = dbUser[0].userInfo.personalTraits;

    // get all users in db
    const allUsers = await db.Student.find({username: {$ne: sessionUsername}}, {_id: 0, userInfo: 1, username: 1});

    //var ED = [];

    // EG stands for Experience Gain and it measures how much can a user learn from another user. 
    // This encapsulates the skills complementarity aspect of the recommendation algorithm.
    var EG = [];

    // this encapsulates how similar are two users in terms of their personal skills
    var personalitySimilarity = [];

    // this is the final recommendation score
    var score = [];

    // for each user compute the final recommendation score with the currently logged in user
    for (var i = 0; i < allUsers.length; i++) {
        otherUser = allUsers[i].userInfo.skillsInfo;
        otherUserP = allUsers[i].userInfo;

        // // compute the ED vector
        // ED[i] = 0;
        // var currSkillNames = JSON.parse(currUser.knownSkillNames);
        // var size = Object.keys(currSkillNames).length;

        // var otherSkillNames = JSON.parse(otherUser.knownSkillNames);

        // var numCommonSkills = 0;
        // var numUncommonSkills = 0;
        var numCommonLearnSkills = 0;
        
        // for (key in currSkillNames) {
        //     if (Object.keys(otherSkillNames).length > 0 && otherSkillNames.hasOwnProperty(key)) {
        //         var indexCurr = currSkillNames[key];
        //         var indexOther = otherSkillNames[key];
        //         numCommonSkills++;
        //         ED[i] += Math.abs(currUser.knownSkills[indexCurr] - otherUser.knownSkills[indexOther]);
        //     } else {
        //         numUncommonSkills++;
        //         ED[i] += currUser.knownSkills[currSkillNames[key]];
        //     }
        // }

        // for (key in otherSkillNames) {
        //     if (Object.keys(currSkillNames).length == 0 || !currSkillNames.hasOwnProperty(key)) {
        //         numUncommonSkills++;
        //         console.log(otherUser.knownSkills);
        //         ED[i] += otherUser.knownSkills[otherSkillNames[key]];
        //     }
        // }

        // compute the EG vector
        EG[i] = 0;

        // get list of skills current user wants to improve
        var currImproveNames = JSON.parse(currUser.areasOfImprovementNames);

        // get list of skills current user knows
        var currSkillNames = JSON.parse(currUser.knownSkillNames);

        // get list of skills other user knows
        var otherSkillNames = JSON.parse(otherUser.knownSkillNames);

        // for each skill the current user wants to improve compute
        // the amount of improvement the other user can provide
        for (key in currImproveNames) {
            if (Object.keys(otherSkillNames).length > 0 && otherSkillNames.hasOwnProperty(key)) {
                var indexCurr = currSkillNames[key];
                var indexOther = otherSkillNames[key];
                EG[i] += Math.max(0, (otherUser.knownSkills[indexOther] - currUser.knownSkills[indexCurr])/2);
            }
        }
        
        // create a vector of the personal characteristics of the other user
        otherVector = [];
        otherVector.push(otherUserP.personalGoals.grade);
        otherVector.push(otherUserP.personalGoals.learningSkills);
        otherVector.push(otherUserP.personalGoals.makeImpact);
        otherVector.push(otherUserP.personalGoals.meetingPeople);
        otherVector.push(otherUserP.personalGoals.makeProduct);
        otherVector.push(otherUserP.personalTraits.quiteness);
        otherVector.push(otherUserP.personalTraits.contribution);
        otherVector.push(otherUserP.personalTraits.leaderPosition);
        otherVector.push(otherUserP.personalTraits.communicationFrequency);
        otherVector.push(otherUserP.personalTraits.proactivityLevel);

        // create a vector of the personal characteristics of the current user
        currVector = [];
        currVector.push(currUserPersonalGoals.grade);
        currVector.push(currUserPersonalGoals.learningSkills);
        currVector.push(currUserPersonalGoals.makeImpact);
        currVector.push(currUserPersonalGoals.meetingPeople);
        currVector.push(currUserPersonalGoals.makeProduct);
        currVector.push(currUserPersonalTraits.quiteness);
        currVector.push(currUserPersonalTraits.contribution);
        currVector.push(currUserPersonalTraits.leaderPosition);
        currVector.push(currUserPersonalTraits.communicationFrequency);
        currVector.push(currUserPersonalTraits.proactivityLevel);

        // compute the difference in personality traits
        personalitySimilarity[i] = persSim(currVector, otherVector);

        // if (numCommonSkills != 0) {
        //     ED[i] = ED[i] * 1.0 / ((numCommonSkills+numUncommonSkills)*5);
        // } else {
        //     ED[i] = 1;
        // }

        // normalize EG vector
        if (Object.keys(currImproveNames).length != 0) {
            EG[i] = EG[i]*1.0 / (Object.keys(currImproveNames).length*4);
        } 

        // console.log(allUsers[i].username + ": " + ED[i]);
        console.log(allUsers[i].username + ": " + EG[i]);
        console.log(allUsers[i].username + ": " + personalitySimilarity[i]);

        // compute final score
        score[i] = (1.0/3) * EG[i] + (1.0/3) * personalitySimilarity[i];
    }

    var updated = sortUsers(score, allUsers);
    res.json({Reccomendation: updated});
}

/*
 * Function for sorting users in Database based on the recommendation scores
 * @params score, an array where score[i] is the recommendation score for users[i]
 * @params users, an array of all the users in the Database
 * @return a sorted array of users
 */
function sortUsers(score, users) {
    // create array where each elements is of the form [username, recommendation score]
    var sortable = [];
    for (var r in score) {
        sortable.push([users[r].username, score[r]]);
    }

    // sort the array
    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });

    // reverse it (so that it's in descending order) and extract only the usernames
    sortable.reverse();
    var updated = [];
    for (var i = 0; i < sortable.length; i++) {
        updated.push(sortable[i][0]);
    }

    console.log(sortable);
    
    return updated;
}

/*
 * Helper function for computing the sum of the 
 * differences between the values of two vectors.
 * @param v1, vector 1
 * @param v2, vector 2
 * @return similarity value of the two input vectors
 */
function persSim(v1, v2) {
    var sum = 0.0;
    
    for (var i = 0; i < v1.length; i++) {
        sum += Math.abs(v1[i] - v2[i]);
    }

    return 1.0 - (sum / 40.0);
}

var routes = {
    getUser: getUser,
    checkLogin: checkLogin,
    signUp: signUp,
    getRecs: getRecs,
    updateUserInfo: updateUserInfo,
    getSession: getSession,
    logout: logout
};

module.exports = routes;
