document.addEventListener("DOMContentLoaded", function () {
  const checkBox = document.getElementById("consent");
  const nextBtn = document.getElementById("submit-button");
  const instructionsBtn = document.getElementById("instructions-button");
  const readyDiv = document.getElementById("practice");
  const image = document.getElementById("background-image");
  const trialDiv = document.getElementById("trial-div");
  const scoreDiv = document.getElementById("score-div");
  const shotTextDiv = document.getElementById("shot");
  const audioHighTextDiv = document.getElementById("audio-high");
  const audioLowTextDiv = document.getElementById("audio-low");
  const shotPointsDiv = document.getElementById("points");
  const shotTotalDiv = document.getElementById("total");
  const realStartDiv = document.getElementById("practice-complete");
  const practiceOne = document.getElementById("complete-one");
  const practiceTwo = document.getElementById("complete-two");
  const studyDiv = document.getElementById("study-div");
  const formDiv = document.getElementById("form-div");
  const instructionsOne = document.getElementById("instructions-one");
  const instructionsTwo = document.getElementById("instructions-two");
  const instructionsThree = document.getElementById("instructions-three");
  const instructionsFour = document.getElementById("instructions-four");
  const instructionsFive = document.getElementById("instructions-five");
  const instructionsSix = document.getElementById("instructions-six");
  const instructionsSeven = document.getElementById("instructions-seven");
  const instructionsEight = document.getElementById("instructions-eight");
  const timerDiv = document.getElementById("countdown-timer");
  const audioDiv = document.getElementById("audio-div");
  const highInstructions = document.getElementById("high-load");
  const lowInstructions = document.getElementById("low-load");
  let secondPracticeDiv = document.getElementById("second-practice");
  let secondHighInstructions = document.getElementById("high-load-2");
  let secondLowInstructions = document.getElementById("low-load-2");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const test = urlParams.get("test");
  const training = urlParams.get("control");
  const storage = window.localStorage;
  let surveyURL =
    "https://csunsbs.qualtrics.com/jfe/form/SV_80pS9v72sJiWWHk?id=";
  let allDone = false;
  let trialResults = [];
  let testString;
  let testTypeString;
  let gun;
  let shotText;
  let shotPoints;
  let instructionsCounter = 0;
  let count = 0;
  let total = 0;
  let shooterTimer;
  let goodShot = 10;
  let goodNoShot = 5;
  let badShot = -20;
  let badNoShot = -40;
  let noShot = -10;
  let shooterBackground;
  let noShooterBackground;
  let numBackgrounds;
  let bgCounter = 0;
  let key;
  let whichTrial;
  let realTrial = false;
  let practice = true;
  let fired = true;
  let id;
  let audioFile;
  let currentAudio;
  let previousAudio = -1;
  let audioKey = false;
  let startPractice = true;
  let highComplete = false;
  let lowComplete = false;
  let secondPractice = false;

  let one = [];
  const oneAudio = "./assets/audio/one.wav";
  let two = [];
  const twoAudio = "./assets/audio/two.wav";
  let three = [];
  const threeAudio = "./assets/audio/three.wav";
  let four = [];
  const fourAudio = "./assets/audio/four.wav";
  let six = [];
  const sixAudio = "./assets/audio/six.wav";
  let seven = [];
  const sevenAudio = "./assets/audio/seven.wav";
  let eight = [];
  const eightAudio = "./assets/audio/eight.wav";
  let nine = [];
  const nineAudio = "./assets/audio/nine.wav";

  let practiceImages = [
    [
      "./assets/images/practice/wu01.jpg",
      "./assets/images/practice/wu01y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu02.jpg",
      "./assets/images/practice/wu02y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu04.jpg",
      "./assets/images/practice/wu04y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu05.jpg",
      "./assets/images/practice/wu05y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu06.jpg",
      "./assets/images/practice/wu06y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu08.jpg",
      "./assets/images/practice/wu08y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu09.jpg",
      "./assets/images/practice/wu09y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu10.jpg",
      "./assets/images/practice/wu10y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu11.jpg",
      "./assets/images/practice/wu11y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu12.jpg",
      "./assets/images/practice/wu12y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu13.jpg",
      "./assets/images/practice/wu13y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu15.jpg",
      "./assets/images/practice/wu15y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu16.jpg",
      "./assets/images/practice/wu16y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu17.jpg",
      "./assets/images/practice/wu17y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu18.jpg",
      "./assets/images/practice/wu18y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu19.jpg",
      "./assets/images/practice/wu19y.jpg",
      true,
    ],
  ];

  let trialImages = [
    [
      "./assets/images/test/za.bmp",
      [
        "./assets/images/test/zaba011.bmp",
        "./assets/images/test/zabu02w4.bmp",
        "./assets/images/test/zawa90d3.bmp",
        "./assets/images/test/zawu02w4.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zb.bmp",
      [
        "./assets/images/test/zbba05d1.bmp",
        "./assets/images/test/zbba923.bmp",
        "./assets/images/test/zbbu07p4.bmp",
        "./assets/images/test/zbbu98p1.bmp",
        "./assets/images/test/zbwa08d5.bmp",
        "./assets/images/test/zbwa012.bmp",
        "./assets/images/test/zbwu06p1.bmp",
        "./assets/images/test/zbwu90c3.bmp",
      ],
      [true, true, false, false, true, true, false, false],
    ],
    [
      "./assets/images/test/zc.bmp",
      [
        "./assets/images/test/zcba03d5.bmp",
        "./assets/images/test/zcbu90p5.bmp",
        "./assets/images/test/zcwa935.bmp",
        "./assets/images/test/zcwu97p4.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zd.bmp",
      [
        "./assets/images/test/zdba022.bmp",
        "./assets/images/test/zdbu03c3.bmp",
        "./assets/images/test/zdwa94d1.bmp",
        "./assets/images/test/zdwu95w2.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/ze.bmp",
      [
        "./assets/images/test/zeba045.bmp",
        "./assets/images/test/zebu10p1.bmp",
        "./assets/images/test/zewa921.bmp",
        "./assets/images/test/zewu96w1.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zf.bmp",
      [
        "./assets/images/test/zfba90d3.bmp",
        "./assets/images/test/zfbu92w1.bmp",
        "./assets/images/test/zfwa911.bmp",
        "./assets/images/test/zfwu01p4.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zg.bmp",
      [
        "./assets/images/test/zgba072.bmp",
        "./assets/images/test/zgba103.bmp",
        "./assets/images/test/zgbu04p3.bmp",
        "./assets/images/test/zgbu08w1.bmp",
        "./assets/images/test/zgwa02d4.bmp",
        "./assets/images/test/zgwa06d2.bmp",
        "./assets/images/test/zgwu07w2.bmp",
        "./assets/images/test/zgwu99p2.bmp",
      ],
      [true, true, false, false, true, true, false, false],
    ],
    [
      "./assets/images/test/zh.bmp",
      [
        "./assets/images/test/zhba94d1.bmp",
        "./assets/images/test/zhbu05c5.bmp",
        "./assets/images/test/zhwa03d2.bmp",
        "./assets/images/test/zhwu05p5.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zi.bmp",
      [
        "./assets/images/test/ziba08d5.bmp",
        "./assets/images/test/ziba972.bmp",
        "./assets/images/test/zibu01p2.bmp",
        "./assets/images/test/zibu09p5.bmp",
        "./assets/images/test/ziwa05d2.bmp",
        "./assets/images/test/ziwa073.bmp",
        "./assets/images/test/ziwu04p2.bmp",
        "./assets/images/test/ziwu08p3.bmp",
      ],
      [true, true, false, false, true, true, false, false],
    ],
    [
      "./assets/images/test/zj.bmp",
      [
        "./assets/images/test/zjba094.bmp",
        "./assets/images/test/zjbu97c1.bmp",
        "./assets/images/test/zjwa04d1.bmp",
        "./assets/images/test/zjwu03c5.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zk.bmp",
      [
        "./assets/images/test/zkba99d4.bmp",
        "./assets/images/test/zkba131.bmp",
        "./assets/images/test/zkbu11w2.bmp",
        "./assets/images/test/zkbu16c3.bmp",
        "./assets/images/test/zkwa97d3.bmp",
        "./assets/images/test/zkwa152.bmp",
        "./assets/images/test/zkwu11p4.bmp",
        "./assets/images/test/zkwu13p1.bmp",
      ],
      [true, true, false, false, true, true, false, false],
    ],
    [
      "./assets/images/test/zl.bmp",
      [
        "./assets/images/test/zlba931.bmp",
        "./assets/images/test/zlbu12p4.bmp",
        "./assets/images/test/zlwa953.bmp",
        "./assets/images/test/zlwu16c1.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zm.bmp",
      [
        "./assets/images/test/zmba96d2.bmp",
        "./assets/images/test/zmbu91c4.bmp",
        "./assets/images/test/zmwa98d5.bmp",
        "./assets/images/test/zmwu94c1.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zn.bmp",
      [
        "./assets/images/test/znba11d5.bmp",
        "./assets/images/test/znbu94p4.bmp",
        "./assets/images/test/znwa16d3.bmp",
        "./assets/images/test/znwu19c3.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zo.bmp",
      [
        "./assets/images/test/zoba125.bmp",
        "./assets/images/test/zobu96w2.bmp",
        "./assets/images/test/zowa195.bmp",
        "./assets/images/test/zowu91w3.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zp.bmp",
      [
        "./assets/images/test/zpba95d3.bmp",
        "./assets/images/test/zpbu99w5.bmp",
        "./assets/images/test/zpwa14d1.bmp",
        "./assets/images/test/zpwu98w5.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zq.bmp",
      [
        "./assets/images/test/zqba91d4.bmp",
        "./assets/images/test/zqbu13p3.bmp",
        "./assets/images/test/zqwa11d4.bmp",
        "./assets/images/test/zqwu15w2.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zr.bmp",
      [
        "./assets/images/test/zrba141.bmp",
        "./assets/images/test/zrba164.bmp",
        "./assets/images/test/zrbu17w3.bmp",
        "./assets/images/test/zrbu93c1.bmp",
        "./assets/images/test/zrwa134.bmp",
        "./assets/images/test/zrwa964.bmp",
        "./assets/images/test/zrwu14p3.bmp",
        "./assets/images/test/zrwu92c2.bmp",
      ],
      [true, true, false, false, true, true, false, false],
    ],
    [
      "./assets/images/test/zs.bmp",
      [
        "./assets/images/test/zsba17d3.bmp",
        "./assets/images/test/zsbu95c2.bmp",
        "./assets/images/test/zswa174.bmp",
        "./assets/images/test/zswu93c4.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zt.bmp",
      [
        "./assets/images/test/ztba98d2.bmp",
        "./assets/images/test/ztbu14p2.bmp",
        "./assets/images/test/ztwa995.bmp",
        "./assets/images/test/ztwu17p5.bmp",
      ],
      [true, false, true, false],
    ],
  ];

  let firebaseConfig = {
    apiKey: "AIzaSyCqRL94OHiQ8sBYGA_tdCtbMFwTuDODAnI",
    authDomain: "shooter-cog.firebaseapp.com",
    databaseURL: "https://shooter-cog-default-rtdb.firebaseio.com",
    projectId: "shooter-cog",
    storageBucket: "shooter-cog.appspot.com",
    messagingSenderId: "311137323923",
    appId: "1:311137323923:web:9e80f6ee30cc92e477b666",
    measurementId: "G-X9Z4W7TPSR",
  };
  // Initialize Firebase
  let database = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  let today = new Date();
  let todayString = today.toDateString();
  let dbRef = database.database().ref(todayString);
  let userRef = dbRef.push();
  id = userRef.key;

  if (checkBox) {
    let randomTest = Math.round(Math.random());
    let randType;
    if (randomTest == 0) {
      randType = "low";
    } else {
      randType = "high";
    }
    storage.setItem("testType", randType);
    storage.setItem("test", test);
    storage.setItem("control", training);

    checkBox.onchange = function () {
      if (this.checked) {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    };

    let dbRef = database.database().ref();
    dbRef.once('value', function(snapshot) { 
      let snapCount = 0;
      for(let child in snapshot.val()){
        let obj = snapshot.val()[child]
        snapCount = snapCount + Object.keys(obj).length
      }
      
      if(snapCount >= 200){
        let landing = document.getElementById('landing');
        landing.classList.add("text-center");
        landing.classList.add("font-weight-bold");
        landing.innerHTML = "Data collection for this study has concluded";
      }
    });

  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.setItem("consent", "true");
      window.location.href = "instructions.html";
    });
  }

  if (instructionsBtn) {
    if (storage.getItem("testType") == "high") {
      highInstructions.style.display = "block";
    } else {
      lowInstructions.style.display = "block";
    }

    // document.addEventListener("keydown", function (e) {
    //   if (instructionsCounter == 3 && e.key == " ") {
    //     window.location.href = "study.html";
    //   }
    // });

    instructionsBtn.addEventListener("click", function (e) {
      e.preventDefault();
      instructionsCounter++;
      switch (instructionsCounter) {
        case 0:
          secondStudy.classList.add("invisible");
          instructionsOne.classList.remove("invisible");
          break;
        case 1:
          instructionsOne.classList.add("invisible");
          instructionsTwo.classList.remove("invisible");
          break;
        case 2:
          instructionsTwo.classList.add("invisible");
          instructionsThree.classList.remove("invisible");
          break;
        case 3:
          instructionsThree.classList.add("invisible");
          instructionsFour.classList.remove("invisible");
          break;
        case 4:
          instructionsFour.classList.add("invisible");
          instructionsFive.classList.remove("invisible");
          break;
        case 5:
          instructionsFive.classList.add("invisible");
          instructionsSix.classList.remove("invisible");
          break;
        case 6:
          instructionsSix.classList.add("invisible");
          instructionsSeven.classList.remove("invisible");
          break;
        case 7:
          window.location.href = "study.html";
          break;
        default:
          break;
      }
    });
  }

  function writeUserData() {
    userRef.set(trialResults).then(function () {
      formDiv.classList.remove("invisible");
      allDone = true;
    });
  }

  let practiceCount = 0;
  let reactionTime;

  document.addEventListener("keyup", function (e) {
    e.preventDefault();
    clickTime = Date.now();
    reactionTime = clickTime - startTime;

    if (
      !fired &&
      (e.key == "f" || e.key == "F" || e.key == "j" || e.key == "J")
    ) {
      clearTimeout(shooterTimer);
      fired = true;
      key = e.key;

      showScore(realTrial);
    }

    if (
      audioKey &&
      (e.key == "t" || e.key == "T" || e.key == "b" || e.key == "B")
    ) {
      audioKey = false;
      key = e.key;
      audioResult();
    }

    if (startPractice && e.key == " ") {
      startPractice = false;
      instructionsEight.classList.add("invisible");
      studyDiv.classList.remove("invisible");
      start();
    }

    if (secondPractice && e.key == " ") {
      secondPractice = false;
      secondPracticeDiv.classList.add("invisible");
      studyDiv.classList.remove("invisible");
      timerDiv.classList.remove("invisible");
      secondStart();
    }

    if (!practice && e.key == " " && practiceCount < 2) {
      practiceCount++;
      if (practiceCount == 1) {
        practiceOne.classList.add("invisible");
        practiceTwo.classList.remove("invisible");
      }
      if (practiceCount == 2) {
        practiceTwo.classList.add("invisible");
        timerDiv.classList.remove("invisible");
        start();
      }
    }

    if (allDone && e.key == " ") {
      storage.clear();
      window.location.href = surveyURL + id;
    }
  });

  class Trial {}

  function showScore(real) {
    count++;

    if (!fired) {
      fired = true;
      reactionTime = -1;
    }

    if (real) {
      arr = trialImages;
      whichTrial = trial;
    } else {
      arr = practiceImages;
      whichTrial = practiceTrial;
    }
    switch (key) {
      case "J":
      case "j":
        if (gun) {
          shotText = "Good shot!";
          shotPoints = goodShot;
          total = total + goodShot;
        } else {
          shotText = "Incorrect!";
          shotPoints = badShot;
          total = total + badShot;
        }
        break;

      case "F":
      case "f":
        if (gun) {
          shotText = "You've been shot!";
          shotPoints = badNoShot;
          total = total + badNoShot;
        } else {
          shotText = "Correct!";
          shotPoints = goodNoShot;
          total = total + goodNoShot;
        }
        break;

      default:
        shotText = "Please respond more quickly next time.";
        shotPoints = noShot;
        total = total + noShot;
        break;
    }

    if (real) {
      let today = new Date();
      let todayDateString = today.toLocaleDateString();
      let todayTimeString = today.toLocaleTimeString();
      let todayString = todayDateString + " " + todayTimeString;
      testTypeString = storage.getItem("testType");
      thisTrial = new Trial();
      thisTrial.audioInput = "N/A";
      thisTrial.currentAudio = "N/A";
      thisTrial.previousAudio = "N/A";
      thisTrial.image = shooterBackground.substring(21);
      thisTrial.shotText = shotText;
      thisTrial.points = shotPoints;
      thisTrial.totalPoints = total;
      thisTrial.trialNumber = count;
      thisTrial.date = todayString;
      thisTrial.load = testTypeString;
      thisTrial.reactionTime = reactionTime;
      trialResults.push(thisTrial);
    }

    shotTextDiv.textContent = shotText;
    shotPointsDiv.textContent = shotPoints + " points";
    shotTotalDiv.textContent = total + " total points";
    trialDiv.classList.add("invisible");
    scoreDiv.classList.remove("invisible");

    if (
      (storage.getItem("testType") == "high" && count > 1) ||
      storage.getItem("testType") == "low"
    ) {
      setTimeout(audioCue, 3000);
    } else {
      setTimeout(whichTrial, 3000);
    }
  }

  function audioCue() {
    key = null;
    audioKey = true;
    scoreDiv.classList.add("invisible");
    if (storage.getItem("testType") == "high") {
      audioHighTextDiv.classList.remove("invisible");
    } else {
      audioLowTextDiv.classList.remove("invisible");
    }
    audioDiv.classList.remove("invisible");
  }

  function audioResult() {
    if (realTrial) {
      if (key == "b" || key == "B") {
        trialResults[trialResults.length - 1].audioInput = "lower";
      } else if (key == "t" || key == "T") {
        trialResults[trialResults.length - 1].audioInput = "higher";
      }

      if (storage.getItem("testType") == "high") {
        trialResults[trialResults.length - 1].currentAudio = currentAudio;
        trialResults[trialResults.length - 1].previousAudio = previousAudio;
      } else {
        trialResults[trialResults.length - 1].currentAudio = currentAudio;
      }
    }

    previousAudio = currentAudio;
    whichTrial();
  }

  let randomTimes = [];

  function setRandomTimes(num) {
    for (let i = 0; i < num; i++) {
      randomTimes[i] = Math.floor(Math.random() * (1000 - 500) + 500);
    }
  }

  function showBackground(real) {
    if (!fired) {
      fired = true;
    }

    bgCounter++;
    if (real) {
      arr = trialImages;
      bgArrLoc = Math.floor(Math.random() * arr.length);
      randomShooterImage = Math.floor(Math.random() * arr[bgArrLoc][1].length);
      noShooterBackground = arr[bgArrLoc][0];
      shooterBackground = arr[bgArrLoc][1][randomShooterImage];
      gun = arr[bgArrLoc][2][randomShooterImage];
      whichTrial = trial;
    } else {
      arr = practiceImages;
      bgArrLoc = Math.floor(Math.random() * arr.length);
      noShooterBackground = arr[bgArrLoc][0];
      shooterBackground = arr[bgArrLoc][1];
      gun = arr[bgArrLoc][2];
      whichTrial = practiceTrial;
    }

    image.src = noShooterBackground;
    image.onload = function () {
      trialDiv.classList.remove("invisible");
      whichTrial();
    };
  }

  let startTime;
  let clickTime;

  function showShooterBackground(real) {
    image.src = shooterBackground;
    image.onload = function () {
      startTime = Date.now();
      fired = false;
      bgCounter = 0;
      shooterTimer = setTimeout(showScore, 700, real);
    };
  }

  let randAudioBG;
  let randAudio;
  let lastAudio = -1;

  function practiceTrial() {
    key = null;
    if (!fired) {
      fired = true;
    }
    scoreDiv.classList.add("invisible");
    audioDiv.classList.add("invisible");
    audioHighTextDiv.classList.add("invisible");
    audioLowTextDiv.classList.add("invisible");
    if (count < 8) {
      //8
      if (bgCounter == 0) {
        numBackgrounds = Math.floor(Math.random() * 4) + 1;
        setRandomTimes(numBackgrounds);
        do {
          randAudio = Math.floor(Math.random() * 8);
        } while (randAudio == lastAudio);
        lastAudio = randAudio;
        randAudioBG = Math.floor(Math.random() * numBackgrounds);
        audioFile = audioFiles[randAudio][0];
        currentAudio = audioFiles[randAudio][1];
      }

      if (count == 0) {
        previousAudio = currentAudio;
      }

      if (bgCounter == randAudioBG) {
        audioFile.play();
      }

      bgCounter < numBackgrounds
        ? setTimeout(showBackground, randomTimes[bgCounter], false)
        : setTimeout(showShooterBackground, randomTimes[bgCounter], false);
    } else {
      previousAudio = -1;
      realStart();
    }
  }

  function trial() {
    key = null;
    if (!fired) {
      fired = true;
    }
    timerDiv.classList.add("invisible");
    scoreDiv.classList.add("invisible");
    audioDiv.classList.add("invisible");
    audioHighTextDiv.classList.add("invisible");
    audioLowTextDiv.classList.add("invisible");
    if (count < 50) {
      //50

      if (bgCounter == 0) {
        numBackgrounds = Math.floor(Math.random() * 4) + 1;
        setRandomTimes(numBackgrounds);
        do {
          randAudio = Math.floor(Math.random() * 8);
        } while (randAudio == lastAudio);
        lastAudio = randAudio;
        randAudioBG = Math.floor(Math.random() * numBackgrounds);
        audioFile = audioFiles[randAudio][0];
        currentAudio = audioFiles[randAudio][1];
      }

      if (count == 0) {
        previousAudio = currentAudio;
      }

      if (bgCounter == randAudioBG) {
        audioFile.play();
      }

      bgCounter < numBackgrounds
        ? setTimeout(showBackground, randomTimes[bgCounter], true)
        : setTimeout(showShooterBackground, randomTimes[bgCounter], true);
    } else if ((highComplete == true || lowComplete == true) && count == 50) {
      //count == 50
      complete();
    } else {
      secondPracticeFunc();
    }
  }

  function secondPracticeFunc() {
    secondPractice = true;
    secondPracticeDiv.classList.remove("invisible");

    if (storage.getItem("testType") == "high") {
      highComplete = true;
      secondLowInstructions.style.display = "block";
      storage.setItem("testType", "low");
    } else {
      lowComplete = true;
      secondHighInstructions.style.display = "block";
      storage.setItem("testType", "high");
    }
  }

  function secondStart() {
    total = 0;
    count = 0;
    realTrial = false;
    countdownTimer = 6;
    countdownInterval = setInterval(timer, 1000);
  }

  function realStart() {
    total = 0;
    count = 0;
    realTrial = true;
    realStartDiv.classList.remove("invisible");
    practice = false;
    if (highComplete == true || lowComplete == true) {
      practiceCount = 0;
      practiceOne.classList.remove("invisible");
    }
  }

  let countdownTimer;
  let countdownInterval;

  let audioFiles = [];

  function start() {
    one[0] = new Audio(oneAudio);
    one[1] = 1;
    audioFiles.push(one);
    two[0] = new Audio(twoAudio);
    two[1] = 2;
    audioFiles.push(two);
    three[0] = new Audio(threeAudio);
    three[1] = 3;
    audioFiles.push(three);
    four[0] = new Audio(fourAudio);
    four[1] = 4;
    audioFiles.push(four);
    six[0] = new Audio(sixAudio);
    six[1] = 6;
    audioFiles.push(six);
    seven[0] = new Audio(sevenAudio);
    seven[1] = 7;
    audioFiles.push(seven);
    eight[0] = new Audio(eightAudio);
    eight[1] = 8;
    audioFiles.push(eight);
    nine[0] = new Audio(nineAudio);
    nine[1] = 9;
    audioFiles.push(nine);
    document.documentElement.style.cursor = "none";
    countdownTimer = 6;
    countdownInterval = setInterval(timer, 1000);
  }

  function timer() {
    countdownTimer = countdownTimer - 1;
    if (countdownTimer == 0) {
      timerDiv.textContent = "BEGIN";
    } else {
      timerDiv.textContent = countdownTimer;
    }

    if (countdownTimer < 0) {
      clearInterval(countdownInterval);
      timerDiv.textContent = "";
      timerDiv.classList.add("invisible");
      realTrial ? trial() : practiceTrial();
    }
  }

  function complete() {
    studyDiv.classList.add("invisible");
    const whichTestType = storage.getItem("testType");
    const whichTraining = storage.getItem("control");
    formDiv.classList.remove("invisible");
    testString = "firstStudy";

    if (whichTraining == "control") {
      trainingString = "control";
    } else {
      trainingString = "training";
    }
    if (whichTestType == "low") {
      testTypeString = "low";
    } else {
      testTypeString = "high";
    }

    writeUserData();
  }
});
