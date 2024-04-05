import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//Set and Use: body-parser|EJS|static files
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

//Answer Array
const answers = [
    'calgary',
    'buffalo jump',
    'chief many horses',
    'grain export',
    'beauty',
    'reading',
    'shogun',
    'blackthorne',
    'samurai',
    'two swords',
    'kill anyone',
    'bushido',
    'mongols',
    'colored hockey league',
    'stanley cup',
    'six',
    'mask',
    'power play',
    'penalty kill',
    'hanging'
];

const questions = [
  'Name the Canadian city where season 2 of Hell on Wheels was filmed. [1]',
  'The gruesome name of one of the unique land features where native people killed large amounts of buffalo? Head-Smashed-In... [2]',
  'What is Joseph Black Moon’s Father’s name? [3]',
  'Name the real-life occupation of Thomas Durant before he became a Railroad Owner. [2]',
  'The name “The Suede” gives to his sawed-ff double-barrel shotgun? [1]',
  'The skill that his master taught Elam Ferguson as a “parlor trick” as a young boy. [1]',
  'The Americanized version of “Sei-i Taishōgun”, the official title of the Commander-in-Chief of the Expeditionary Force Against the Barbarians [1]',
  'One of the main characters, he is loosely based on the real English navigator, William Adams. John… [1]',
  'The wealthy warrior-class nobility appointed by the daimyo during the Meiji era [1]',
  'Made law in 1629, what does the law of “daishō” require Samurai that are on official duty to wear? [2]',
  'Samurai were granted “kiri-sute gomen”, which is the right to do what to the lower class in certain situations? [2]',
  'Name the moral code governing the samurai attitude, behavior, and lifestyle [1]',
  'During the 13th century, the samurai class proved themselves adept at defending their lands from which invading group? [1]',
  'The goalie going down to the ice to make a save, and the slapshot were both moves pioneered in this hockey league (CHL). [3]',
  'The name of the trophy won by the NHL team that wins the league championship each year. [2]',
  'How many players are on the ice at one time for a team? [1]',
  '1974 was the last year that goalies didn’t wear a what? [1]',
  'What its called one team has more players on the ice due to a penalty [2]',
  'What its called when one team has less players due to a penalty [2]',
  'Ruth\'s punishment for murdering Sydney Snow [1]'
];

//Pieces Array
let pieces = [
  "p1","p2","p3","p4","p5","p6","p7","p8","p9","p10",
  "p11","p12","p13","p14","p15","p16","p17","p18","p19","p20",
  "p21","p22","p23","p24","p25","p26","p27","p28","p29","p30",
  "p31","p32","p33","p34","p35","p36","p37","p38","p39","p40",
]

const data = {
"q":questions,
"a":answers,
"id":[0],
"right": 0,
"wrong": 0,
"pieces": pieces
}

//Check Answer
function checkAnswer(answer, answers){
  if ( (answers.indexOf(answer) > -1) ) {
    data.right = 1; //mark as right
    data.wrong = 0; //mark as wrong
    data.pieces.splice(randomArray(data.pieces),1);
    data.pieces.splice(randomArray(data.pieces),1);
    return true
  }
  else { 
    data.right = 0; //reset
    data.wrong = 1; //reset
    return false 
  }
}

//Pick Random Number From Array
function randomArray(namedArray) {
  return Math.floor( Math.random() * namedArray.length ); 
}

//Display Intro
app.get('/', (req,res) => {
    res.render('intro.ejs', data);
});

//Display Question by ID
app.get("/clue/:id", (req, res) => {
  let id = req.params.id; //get ID from path
  data.id.splice(0,1,id); //Add ID to ID array (so form can read it)
  res.render("puzzle.ejs",data);
  data.right = 0; //reset
  data.wrong = 0; //reset
});

//Submit and Check Question
app.post("/submit/:id", (req, res) => {
  let id = req.params.id;
  let question_field = "question_" + id;
  const answer = req.body[question_field];
  if (checkAnswer(answer,answers)) {
    res.render("puzzle-right.ejs",data);
  }
  else {
    res.render("puzzle-wrong.ejs",data);
  }
  });

//Reset
app.get("/reset/", (req, res) => {
  data.right = 0; //reset
  data.wrong = 0;
  data.id = [0];
  data.pieces = [
    "p1","p2","p3","p4","p5","p6","p7","p8","p9","p10",
    "p11","p12","p13","p14","p15","p16","p17","p18","p19","p20",
    "p21","p22","p23","p24","p25","p26","p27","p28","p29","p30",
    "p31","p32","p33","p34","p35","p36","p37","p38","p39","p40",
  ];
  res.render("puzzle.ejs",data);
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});