let startBgImg;
let smokeImg;

let textBg;
let startImg;
let explanationImg;

let screenState = "menu";

let startButton = { x: 0, y: 0, w: 420, h: 190 };
let explanationButton = { x: 0, y: 0, w: 420, h: 190 };
let introPage = 0;
let introLine = 0;
let introCharCount = 0;

let introCharInterval = 4;
let introFontSize = 26;
let introLineGap = 44;

let startButtonAlpha = 0;
let showStartButton = false;

let typingOsc;
let typingEnv;
let bgMusic;
let fightSound;
let slapSound;
let screamSounds = [];
let keyboardSound;
let successSound;
let failSound;

const BG_MUSIC_VOLUME = 0.35;
const BG_MUSIC_DUCK_VOLUME = 0.12;
const EFFECT_VOLUME = 0.45;
const KEYBOARD_VOLUME = 0.18;
const END_SOUND_VOLUME = 0.5;

let introPages = [
  [
    "高铁即将进站。",
    "但站台上的烟味，比柴油机时代还浓。"
  ],
  [
    "请使用 文明劝导 或 物理感化，",
    "把空气质量提升到5。",
    "在你被打进医院之前。"
  ]
];
const VIEW_WIDTH = 1200;
let bg;
let fistIcon, palmIcon, speakIcon, leaveIcon;
let hpEmptyIcon, hpFullIcon;
let closeUpBg;
let closeUpSprites = {};
let sprites1 = {};
let sprites2 = {};
let sprites3 = {};
let sprites4 = {};
let sprites5 = {};
let closeUpSlapSprites = {};
let endPage = "story"; // story = 结局文字页，stats = 数据统计页
const END_TEXT_CHAR_INTERVAL = 130; // 结束文字打字速度，单位毫秒
const END_TEXT_SIZE = 34;          // 结束文字大小

let endTextStartTime = 0;
let endTextShown = "";
let endTextFull = "";
let physicalSlapActive = false;
let physicalSlapNpc = null;
let physicalSlapState = "normal";
let physicalSlapHadHit = false;
let physicalSlapLocked = false;
let physicalSlapRecoverTime = 0;
let physicalSlapCount = 0;
let physicalSlapLine = "";
let physicalSlapLineShown = "";
let physicalSlapLineStartTime = 0;
let physicalSlapLineActive = false;
const PUNCH_DIALOGUE_CHAR_INTERVAL = 80; // 拳头特写台词打字速度，单位毫秒
const PUNCH_DIALOGUE_TEXT_SIZE = 30;     // 拳头特写台词字体大小

let fightSprites = {};

let fightSceneActive = false;
let fightSceneNpcId = null;
let fightSceneX = 0;
let fightSceneY = 0;
let fightSceneStartTime = 0;

const FIGHT_SCENE_DURATION = 3000; // 互殴持续 3 秒
const FIGHT_FRAME_INTERVAL = 300;  // 0.3 秒换帧
const FIGHT_SCENE_HEIGHT = 150;    // 互殴小画面大小，在这里调

const SLAP_FLASH_TIME = 140;
let physicalPunchActive = false;
let physicalPunchNpc = null;
let physicalPunchState = "normal";
let physicalPunchHadHit = false;
let physicalPunchLocked = false;
let physicalPunchRecoverTime = 0;
let physicalPunchCount = 0;
let physicalPunchLine = "";
let physicalPunchLineShown = "";
let physicalPunchLineStartTime = 0;
let physicalPunchLineActive = false;
const PUNCH_FLASH_TIME = 140; // 被打图片显示时间，单位毫秒

const PLAYER_HEIGHT = 115;
const NPC2_HEIGHT = 125;
const NPC3_HEIGHT = 125;
const NPC4_HEIGHT = 125;
const NPC5_HEIGHT = 115;

const FRAME_INTERVAL = 200;
const PLAYER_SPEED = 4;
const NPC_SPEED = 2.2;
const RUNNER_SPEED = 3.4;
const MEET_DISTANCE = 45;

const CAMERA_LEFT_EDGE = 0.35;
const CAMERA_RIGHT_EDGE = 0.72;

const DIALOGUE_CHAR_INTERVAL = 80; // 打字速度在这里改，单位毫秒

let cameraX = 0;


let player;
let npc2, npc2b, npc3, npc3b, npc4, npc4b, npc5, npc5b;

let currentNpc = null;
let choiceActive = false;
let failChoiceActive = false;
let failChoiceNpc = null;

let dialogueActive = false;
let dialogueSpeaker = null;
let dialogueText = "";
let dialogueShownText = "";
let dialogueStartTime = 0;
let dialogueTypingDone = false;
let dialogueOnComplete = null;
let dialogueNpc = null;
let civilResultPending = null;

let choiceButtons = [];
let failChoiceButtons = [];

let statusUI = {
  hp: 5,
  aq: 0
};

const CIVIL_SUCCESS_RATE = {
  "2": 0.5,
  "3": 0.2,
  "4": 0.4,
  "5": 0.3
};
let stats = {
  civilCount: 0,
  physicalCount: 0
};

let endStatsFull = "";
let endStatsShown = "";
let endStatsStartTime = 0;
let endSummaryFull = "";
let endSummaryShown = "";
let endSummaryStartTime = 0;
let endStatsStarted = false;
let endSummaryStarted = false;
let gameState = {
  hp: 5,                  // 初始生命值在这里改
  maxHp: 5,               // 最大生命值在这里改
  aq: 0,                  // 初始空气清新值在这里改
  maxAqToWin: 5,          // AQ 最大值 / 胜利条件在这里改
  minHpToLose: 0,         // 失败条件在这里改

  civilSuccessAqGain: 1.5,  // 文明劝阻成功：AQ +1.5
physicalSuccessAqGain: 1, // 物理劝阻成功：AQ +1
physicalHpCost: 1,        // 物理劝阻成功：HP -1
civilFailAqPenalty: 0.2,  // 文明劝阻失败：AQ -0.2

  airDropEveryMs: 30000,
  airDropAmount: 0.5,

  ended: false,
  lastAirDropTime: 0
};

function preload() {
  bgMusic = loadSound("background.mp3");
fightSound = loadSound("fight.mp3");
slapSound = loadSound("sounds/slap.mp3");

screamSounds = [
  loadSound("惨叫1.mp3"),
  loadSound("惨叫2.mp3"),
  loadSound("尖叫鸡.mp3")
];

keyboardSound = loadSound("keyboard.mp3");
successSound = loadSound("success.mp3");
failSound = loadSound("fail.mp3");
  startBgImg = loadImage("background.png");
smokeImg = loadImage("smoke.png");

textBg = loadImage("text background.PNG");
startImg = loadImage("start.PNG");
  explanationImg = loadImage("explanation.PNG");
  bg = loadImage("images/background.jpg");

  fistIcon = loadImage("fist.png");
  palmIcon = loadImage("palm.png");
  speakIcon = loadImage("speak.png");
  leaveIcon = loadImage("leave.png");

  hpEmptyIcon = loadImage("HP1.png");
  hpFullIcon = loadImage("HP2.png");
closeUpBg = loadImage("close-up background.png");
fightSprites["2"] = [
  loadImage("2fight-1.png"),
  loadImage("2fight-2.png")
];

fightSprites["3"] = [
  loadImage("3fight-1.png"),
  loadImage("3fight-2.png")
];

fightSprites["4"] = [
  loadImage("4fight-1.png"),
  loadImage("4fight-2.png")
];

fightSprites["5"] = [
  loadImage("5fight-1.png"),
  loadImage("5fight-2.png")
];
  
closeUpSprites["2"] = {
  normal: loadImage("2normal.png"),
  hitLeft: loadImage("2hit-left.png"),
hitRight: loadImage("2hit-right.png"),
  angry: loadImage("2hit angry.png")
};

closeUpSprites["3"] = {
  normal: loadImage("3normal.png"),
  hitLeft: loadImage("3hit-left.png"),
  hitRight: loadImage("3hit-right.png"),
  angry: loadImage("3hit angry.png")
};

closeUpSprites["4"] = {
  normal: loadImage("4normal.png"),
  hitLeft: loadImage("4hit-left.png"),
  hitRight: loadImage("4hit-right.png"),
  angry: loadImage("4hit angry.png")
};

closeUpSprites["5"] = {
  normal: loadImage("5normal.png"),
  hitLeft: loadImage("5hit-left.png"),
  hitRight: loadImage("5hit-right.png"),
  angry: loadImage("5hit angry.png")
};
 closeUpSlapSprites["2"] = {
  normal: loadImage("2normal.png"),
  slapLeft: loadImage("2slap-left.png"),
  slapRight: loadImage("2slap-right.png"),
  angry: loadImage("2slap angry.png")
};

closeUpSlapSprites["3"] = {
  normal: loadImage("3normal.png"),
  slapLeft: loadImage("3slap-left.png"),
  slapRight: loadImage("3slap-right.png"),
  angry: loadImage("3slap angry.png")
};

closeUpSlapSprites["4"] = {
  normal: loadImage("4normal.png"),
  slapLeft: loadImage("4slap-left.png"),
  slapRight: loadImage("4slap-right.png"),
  angry: loadImage("4slap angry.png")
};

closeUpSlapSprites["5"] = {
  normal: loadImage("5normal.png"),
  slapLeft: loadImage("5slap-left.png"),
  slapRight: loadImage("5slap-right.png"),
  angry: loadImage("5slap angry.png")
}; 
  sprites1.stand = {
    down: loadImage("1stand-down.png"),
    left: loadImage("1stand-left.png"),
    right: loadImage("1stand-right.png"),
    up: loadImage("1stand-up.png")
  };
  sprites1.walk = {
    down: [
      loadImage("1walk-down-1.png"),
      loadImage("1walk-down-2.png"),
      loadImage("1walk-down-3.png"),
      loadImage("1walk-down-4.png")
    ],
    left: [
      loadImage("1walk-left-1.png"),
      loadImage("1walk-left-2.png"),
      loadImage("1walk-left-3.png"),
      loadImage("1walk-left-4.png"),
      loadImage("1walk-left-5.png"),
      loadImage("1walk-left-6.png"),
      loadImage("1walk-left-7.png")
    ],
    right: [
      loadImage("1walk-right-1.png"),
      loadImage("1walk-right-2.png"),
      loadImage("1walk-right-3.png"),
      loadImage("1walk-right-4.png"),
      loadImage("1walk-right-5.png"),
      loadImage("1walk-right-6.png"),
      loadImage("1walk-right-7.png")
    ],
    up: [
      loadImage("1walk-up-1.png"),
      loadImage("1walk-up-2.png")
    ]
  };

  sprites2.stand = {
    down: loadImage("2stand-down.png"),
    left: loadImage("2stand-left.png"),
    right: loadImage("2stand-right.png"),
    up: loadImage("2stand-up.png")
  };
  sprites2.walk = {
    down: [
      loadImage("2walk-down-1.png"),
      loadImage("2walk-down-2.png")
    ],
    left: [
      loadImage("2walk-left-1.png"),
      loadImage("2walk-left-2.png"),
      loadImage("2walk-left-3.png"),
      loadImage("2walk-left-4.png"),
      loadImage("2walk-left-5.png"),
      loadImage("2walk-left-6.png")
    ],
    right: [
      loadImage("2walk-right-1.png"),
      loadImage("2walk-right-2.png"),
      loadImage("2walk-right-3.png"),
      loadImage("2walk-right-4.png"),
      loadImage("2walk-right-5.png"),
      loadImage("2walk-right-6.png")
    ],
    up: [
      loadImage("2walk-up-1.png"),
      loadImage("2walk-up-2.png")
    ]
  };

  sprites3.stand = {
    down: loadImage("3stand-down.png"),
    left: loadImage("3stand-left.png"),
    right: loadImage("3stand-right.png"),
    up: loadImage("3stand-up.png")
  };
  sprites3.walk = {
    down: [
      loadImage("3walk-down-1.png"),
      loadImage("3walk-down-2.png")
    ],
    left: [
      loadImage("3walk-left-1.png"),
      loadImage("3walk-left-2.png"),
      loadImage("3walk-left-3.png"),
      loadImage("3walk-left-4.png"),
      loadImage("3walk-left-5.png"),
      loadImage("3walk-left-6.png"),
      loadImage("3walk-left-7.png")
    ],
    right: [
      loadImage("3walk-right-1.png"),
      loadImage("3walk-right-2.png"),
      loadImage("3walk-right-3.png"),
      loadImage("3walk-right-4.png"),
      loadImage("3walk-right-5.png"),
      loadImage("3walk-right-6.png"),
      loadImage("3walk-right-7.png")
    ],
    up: [
      loadImage("3walk-up-1.png"),
      loadImage("3walk-up-2.png")
    ]
  };

  sprites4.stand = {
    down: loadImage("4stand-down.png"),
    left: loadImage("4stand-left.png"),
    right: loadImage("4stand-right.png"),
    up: loadImage("4stand-up.png")
  };
  sprites4.walk = {
    down: [
      loadImage("4walk-down-1.png"),
      loadImage("4walk-down-2.png"),
      loadImage("4walk-down-3.png")
    ],
    left: [
      loadImage("4walk-left-1.png"),
      loadImage("4walk-left-2.png"),
      loadImage("4walk-left-3.png"),
      loadImage("4walk-left-4.png"),
      loadImage("4walk-left-5.png"),
      loadImage("4walk-left-6.png"),
      loadImage("4walk-left-7.png")
    ],
    right: [
      loadImage("4walk-right-1.png"),
      loadImage("4walk-right-2.png"),
      loadImage("4walk-right-3.png"),
      loadImage("4walk-right-4.png"),
      loadImage("4walk-right-5.png"),
      loadImage("4walk-right-6.png"),
      loadImage("4walk-right-7.png")
    ],
    up: [
      loadImage("4walk-up-1.png"),
      loadImage("4walk-up-2.png"),
      loadImage("4walk-up-3.png")
    ]
  };

  sprites5.stand = {
    left: loadImage("5stand-left.png"),
    right: loadImage("5stand-right.png")
  };
  sprites5.run = {
    left: [
      loadImage("5run-left-1.png"),
      loadImage("5run-left-2.png"),
      loadImage("5run-left-3.png")
    ],
    right: [
      loadImage("5run-right-1.png"),
      loadImage("5run-right-2.png"),
      loadImage("5run-right-3.png")
    ]
  };
}

function setup() {
  let canvas = createCanvas(VIEW_WIDTH, bg.height);
canvas.parent(document.body);
resizeCanvasToWindow();
setupSounds();
canvas.elt.oncontextmenu = function () {
  return false;
};
  imageMode(CENTER);
  textFont("SimHei");
typingOsc = new p5.Oscillator("sine");
typingOsc.freq(880);
typingOsc.amp(0);
typingOsc.start();

typingEnv = new p5.Envelope();
typingEnv.setADSR(0.001, 0.03, 0, 0.02);
typingEnv.setRange(0.035, 0);
  player = {
  x: 95,
  y: 600,
  dir: "down",
  moving: false,
  frameIndex: 0,
  lastFrameTime: 0
};

  
  npc2 = createNpc("2", sprites2, bg.width * 0.25, bg.height * 0.77, "down", [
  { x: bg.width * 0.25, y: bg.height * 0.77 },
  { x: bg.width * 0.19, y: bg.height * 0.75 },
  { x: bg.width * 0.22, y: bg.height * 0.69 },
  { x: bg.width * 0.30, y: bg.height * 0.72 },
  { x: bg.width * 0.25, y: bg.height * 0.77 }
]);

npc2b = createNpc("2", sprites2, bg.width * 0.70, bg.height * 0.53, "down", [
  { x: bg.width * 0.70, y: bg.height * 0.53 },
  { x: bg.width * 0.70, y: bg.height * 0.70 },
  { x: bg.width * 0.64, y: bg.height * 0.78 },
  { x: bg.width * 0.61, y: bg.height * 0.70 },
  { x: bg.width * 0.66, y: bg.height * 0.64 },
  { x: bg.width * 0.70, y: bg.height * 0.53 }
]);

npc3 = createNpc("3", sprites3, bg.width * 0.35, bg.height * 0.39, "left", [
  { x: bg.width * 0.35, y: bg.height * 0.39 },
  { x: bg.width * 0.18, y: bg.height * 0.43 },
  { x: bg.width * 0.35, y: bg.height * 0.39 }
]);

npc3b = createNpc("3", sprites3, bg.width * 0.54, bg.height * 0.74, "up", [
  { x: bg.width * 0.54, y: bg.height * 0.74 },
  { x: bg.width * 0.57, y: bg.height * 0.58 },
  { x: bg.width * 0.60, y: bg.height * 0.69 },
  { x: bg.width * 0.70, y: bg.height * 0.38 },
  { x: bg.width * 0.54, y: bg.height * 0.74 }
]);

npc4 = createNpc("4", sprites4, bg.width * 0.35, bg.height * 0.72, "right", [
  { x: bg.width * 0.35, y: bg.height * 0.72 },
  { x: bg.width * 0.49, y: bg.height * 0.68 },
  { x: bg.width * 0.55, y: bg.height * 0.44 },
  { x: bg.width * 0.35, y: bg.height * 0.72 }
]);

npc4b = createNpc("4", sprites4, bg.width * 0.88, bg.height * 0.44, "left", [
  { x: bg.width * 0.88, y: bg.height * 0.44 },
  { x: bg.width * 0.74, y: bg.height * 0.51 },
  { x: bg.width * 0.72, y: bg.height * 0.67 },
  { x: bg.width * 0.98, y: bg.height * 0.60 },
  { x: bg.width * 0.88, y: bg.height * 0.44 }
]);

npc5 = createNpc("5", sprites5, bg.width * 0.29, bg.height * 0.47, "right", [
  { x: bg.width * 0.29, y: bg.height * 0.47 },
  { x: bg.width * 0.71, y: bg.height * 0.53 },
  { x: bg.width * 0.29, y: bg.height * 0.47 }
]);
npc5.runner = true;

npc5b = createNpc("5", sprites5, bg.width * 0.95, bg.height * 0.70, "left", [
  { x: bg.width * 0.95, y: bg.height * 0.70 },
  { x: bg.width * 0.88, y: bg.height * 0.73 },
  { x: bg.width * 0.79, y: bg.height * 0.63 },
  { x: bg.width * 0.80, y: bg.height * 0.78 },
  { x: bg.width * 0.95, y: bg.height * 0.70 }
]);
npc5b.runner = true;

  gameState.lastAirDropTime = millis();
  updateStatusUI();
}
function setupSounds() {
  bgMusic.setVolume(BG_MUSIC_VOLUME);
  fightSound.setVolume(EFFECT_VOLUME);
  slapSound.setVolume(EFFECT_VOLUME);
  keyboardSound.setVolume(KEYBOARD_VOLUME);
  successSound.setVolume(END_SOUND_VOLUME);
  failSound.setVolume(END_SOUND_VOLUME);

  for (let s of screamSounds) {
    s.setVolume(EFFECT_VOLUME);
    s.playMode("restart");
  }

  fightSound.playMode("restart");
  slapSound.playMode("restart");
  successSound.playMode("restart");
  failSound.playMode("restart");
}

function draw() {
  if (screenState === "menu") {
  drawStartScreen();
  return;
}

if (screenState === "intro") {
  drawIntroTextScene();
  return;
}

if (screenState === "explanation") {
  drawExplanationScene();
  return;
}

  background(220);

  if (!choiceActive && !failChoiceActive && !dialogueActive && !physicalPunchActive && !physicalSlapActive && !fightSceneActive && !gameState.ended) {
    updatePlayer();
    updateNpcAlongPath(npc2, npc2.path, false);
    updateNpcAlongPath(npc2b, npc2b.path, false);
    updateNpcAlongPath(npc3, npc3.path, false);
    updateNpcAlongPath(npc3b, npc3b.path, false);
    updateNpcAlongPath(npc4, npc4.path, false);
    updateNpcAlongPath(npc4b, npc4b.path, false);
    updateNpcAlongPath(npc5, npc5.path, true);
    updateNpcAlongPath(npc5b, npc5b.path, true);
    checkNpcMeet();
    updateAirDrop();
  }

  updateFightScene();
  updateCamera();

  push();
  translate(-cameraX, 0);

  imageMode(CORNER);
  image(bg, 0, 0, bg.width, bg.height);
  imageMode(CENTER);

  drawAllCharacters();
  drawFightScene();

  pop();

  drawStatusUI();

  updateDialogue();
  drawDialogueBubble();

  if (choiceActive) drawChoiceMenu();

  if (gameState.ended) drawEndText();

  updatePhysicalPunchScene();

  if (physicalPunchActive) {
    drawPhysicalPunchScene();
  }

  updatePhysicalSlapScene();

  if (physicalSlapActive) {
    drawPhysicalSlapScene();
  }
}

function drawStartScreen() {
  const t = millis() * 0.001;

  background(16, 19, 21);
  drawCover(startBgImg, width / 2, height / 2, width, height);

  blendMode(SCREEN);

  drawSmokeLayer(t, {
    alpha: 0.34,
    baseX: -14,
    baseY: 56,
    scale: 1.08,
    speed: 9,
    direction: 1.1,
    blur: 0.8,
    contrast: 1.08
  });

  drawSmokeLayer(t, {
    alpha: 0.50,
    baseX: 0,
    baseY: 30,
    scale: 1.03,
    speed: 6.5,
    direction: -0.9,
    blur: 0.8,
    contrast: 1.08
  });

  drawSmokeLayer(t, {
    alpha: 0.42,
    baseX: -8,
    baseY: 100,
    scale: 1.12,
    speed: 5.2,
    direction: 1.55,
    blur: 1.8,
    contrast: 1.12
  });

  blendMode(BLEND);
  
}
function drawMenuButtons() {
  let buttonW = 420;
  let buttonH = 190;
  let gap = 18;

  startButton.w = buttonW;
  startButton.h = buttonH;
  startButton.x = width / 2;
  startButton.y = height * 0.52;

  explanationButton.w = buttonW;
  explanationButton.h = buttonH;
  explanationButton.x = width / 2;
  explanationButton.y = startButton.y + buttonH + gap;

  imageMode(CENTER);
  image(startImg, startButton.x, startButton.y, startButton.w, startButton.h);
  image(explanationImg, explanationButton.x, explanationButton.y, explanationButton.w, explanationButton.h);
}

function drawSmokeLayer(t, layer) {
  const x = width / 2 + layer.baseX + sin(t / layer.speed) * 32 * layer.direction;
  const y = height / 2 + layer.baseY + cos(t / (layer.speed * 0.72)) * 16;
  const pulse = 1 + sin(t / (layer.speed * 0.55)) * 0.022;

  push();
  translate(x, y);
  scale(layer.scale * pulse);
  tint(255, layer.alpha * 255);
  drawingContext.filter = "blur(" + layer.blur + "px) contrast(" + layer.contrast + ")";
  drawCover(smokeImg, 0, 0, width, height);
  drawingContext.filter = "none";
  noTint();
  pop();
}

function drawCover(img, x, y, targetW, targetH) {
  const imgRatio = img.width / img.height;
  const targetRatio = targetW / targetH;
  let drawW = targetW;
  let drawH = targetH;

  if (imgRatio > targetRatio) {
    drawH = targetH;
    drawW = drawH * imgRatio;
  } else {
    drawW = targetW;
    drawH = drawW / imgRatio;
  }

  image(img, x, y, drawW, drawH);
}

function drawIntroTextScene() {
  imageMode(CENTER);
drawCover(textBg, width / 2, height / 2, width, height);
  textFont("SimHei");
  textSize(introFontSize);
  textLeading(introLineGap);
  textAlign(CENTER, TOP);
  fill(255);

  let lines = introPages[introPage];

  let textBlockWidth = width * 0.62;
  let startX = width / 2;
let startY = height * 0.22;

  for (let i = 0; i < introLine; i++) {
    text(lines[i], startX, startY + i * introLineGap);
  }

  if (introLine < lines.length) {
    let currentLine = lines[introLine];

    if (introCharCount < currentLine.length) {
  startTypingSound();

  if (frameCount % introCharInterval === 0) {
    introCharCount++;
  }
} else {
  stopTypingSound();
}

    introCharCount = constrain(introCharCount, 0, currentLine.length);

    let visibleText = currentLine.substring(0, introCharCount);
    text(visibleText, startX, startY + introLine * introLineGap);
  }

  if (showStartButton) {
    drawStartButton(startY, lines.length);
  }
}

function drawStartButton(startY, lineCount) {
  startButtonAlpha += 5;
  startButtonAlpha = constrain(startButtonAlpha, 0, 255);

  let buttonW = 420;
  let buttonH = 190;
  let gap = -55;

  startButton.w = buttonW;
  startButton.h = buttonH;
  startButton.x = width / 2;
  startButton.y = height * 0.58;

  explanationButton.w = buttonW;
  explanationButton.h = buttonH;
  explanationButton.x = width / 2;
  explanationButton.y = startButton.y + buttonH + gap;

  tint(255, startButtonAlpha);
  imageMode(CENTER);
  image(startImg, startButton.x, startButton.y, startButton.w, startButton.h);
  image(explanationImg, explanationButton.x, explanationButton.y, explanationButton.w, explanationButton.h);
  noTint();
}
function playTypingSound() {
  if (!typingEnv || !typingOsc) return;

  typingOsc.freq(random(760, 920));
  typingEnv.play(typingOsc);
}

function createNpc(id, sprites, x, y, dir, path) {
  return {
    id: id,
    sprites: sprites,
    x: x,
    y: y,
    dir: dir,
    moving: true,
    stationary: false,
    runner: false,
    path: path,
    pathIndex: 0,
    frameIndex: 0,
    lastFrameTime: 0,
    talked: false,
    removed: false
  };
}

function updatePlayer() {
  player.moving = false;

  let dx = 0;
  let dy = 0;

  if (keyIsDown(LEFT_ARROW)) dx -= 1;
  if (keyIsDown(RIGHT_ARROW)) dx += 1;
  if (keyIsDown(UP_ARROW)) dy -= 1;
  if (keyIsDown(DOWN_ARROW)) dy += 1;

  if (dx !== 0 || dy !== 0) {
    player.moving = true;

    if (abs(dx) >= abs(dy)) {
      player.dir = dx > 0 ? "right" : "left";
    } else {
      player.dir = dy > 0 ? "down" : "up";
    }

    let len = sqrt(dx * dx + dy * dy);
    dx /= len;
    dy /= len;

    player.x += dx * PLAYER_SPEED;
    player.y += dy * PLAYER_SPEED;

    player.x = constrain(player.x, 20, bg.width - 20);
    player.y = constrain(player.y, 320, bg.height - 60);

    updateAnimationFrame(player, sprites1.walk[player.dir]);
  } else {
    player.frameIndex = 0;
  }
}

function updateNpcAlongPath(npc, path, horizontalOnly) {
  if (npc.removed || npc.talked || npc.stationary || gameState.ended) return;

  let target = path[(npc.pathIndex + 1) % path.length];
  let dx = target.x - npc.x;
  let dy = target.y - npc.y;
  let d = dist(npc.x, npc.y, target.x, target.y);

  if (d < 4) {
    npc.pathIndex = (npc.pathIndex + 1) % path.length;
    return;
  }

  let speed = npc.runner ? RUNNER_SPEED : NPC_SPEED;

  npc.x += (dx / d) * speed;
  npc.y += (dy / d) * speed;

  if (horizontalOnly) {
    npc.dir = dx >= 0 ? "right" : "left";
  } else {
    if (abs(dx) >= abs(dy)) {
      npc.dir = dx >= 0 ? "right" : "left";
    } else {
      npc.dir = dy >= 0 ? "down" : "up";
    }
  }

  let frames = npc.runner ? sprites5.run[npc.dir] : npc.sprites.walk[npc.dir];
  updateAnimationFrame(npc, frames);
}

function updateAnimationFrame(character, frames) {
  if (!frames || frames.length === 0) return;

  if (millis() - character.lastFrameTime > FRAME_INTERVAL) {
    character.frameIndex = (character.frameIndex + 1) % frames.length;
    character.lastFrameTime = millis();
  }
}

function updateCamera() {
  let screenX = player.x - cameraX;
  let leftLimit = width * CAMERA_LEFT_EDGE;
  let rightLimit = width * CAMERA_RIGHT_EDGE;

  if (screenX > rightLimit) {
    cameraX = player.x - rightLimit;
  } else if (screenX < leftLimit) {
    cameraX = player.x - leftLimit;
  }

  cameraX = constrain(cameraX, 0, bg.width - width);
}

function drawAllCharacters() {
let characters = [
  { type: "player", obj: player },
  { type: "npc", obj: npc2, h: NPC2_HEIGHT },
  { type: "npc", obj: npc2b, h: NPC2_HEIGHT },
  { type: "npc", obj: npc3, h: NPC3_HEIGHT },
  { type: "npc", obj: npc3b, h: NPC3_HEIGHT },
  { type: "npc", obj: npc4, h: NPC4_HEIGHT },
  { type: "npc", obj: npc4b, h: NPC4_HEIGHT },
  { type: "npc", obj: npc5, h: NPC5_HEIGHT },
  { type: "npc", obj: npc5b, h: NPC5_HEIGHT }
];
  characters.sort((a, b) => a.obj.y - b.obj.y);

  for (let item of characters) {
    if (item.type === "player") drawPlayer();
    else drawNpc(item.obj, item.h);
  }
}

function drawPlayer() {
  let img;

  if (player.moving) {
    img = sprites1.walk[player.dir][player.frameIndex % sprites1.walk[player.dir].length];
  } else {
    img = sprites1.stand[player.dir];
  }

  drawImageByHeight(img, player.x, player.y, PLAYER_HEIGHT);
}

function drawNpc(npc, targetHeight) {
  if (npc.removed) return;

  let img;

  if (npc.runner) {
    if (npc.moving && !npc.talked && !npc.stationary) {
      img = npc.sprites.run[npc.dir][npc.frameIndex % npc.sprites.run[npc.dir].length];
    } else {
      img = npc.sprites.stand[npc.dir];
    }
  } else {
    if (npc.moving && !npc.talked && !npc.stationary) {
      img = npc.sprites.walk[npc.dir][npc.frameIndex % npc.sprites.walk[npc.dir].length];
    } else {
      img = npc.sprites.stand[npc.dir];
    }
  }

  drawImageByHeight(img, npc.x, npc.y, targetHeight);
}

function drawImageByHeight(img, x, y, targetHeight) {
  let ratio = targetHeight / img.height;
  let w = img.width * ratio;
  let h = targetHeight;
  image(img, x, y - h / 2, w, h);
}

function checkNpcMeet() {
  if (choiceActive || failChoiceActive || dialogueActive || gameState.ended) return;

 let npcs = [npc2, npc2b, npc3, npc3b, npc4, npc4b, npc5, npc5b];

  for (let npc of npcs) {
    if (npc.removed || npc.talked) continue;

    if (dist(player.x, player.y, npc.x, npc.y) < MEET_DISTANCE) {
      currentNpc = npc;
      choiceActive = true;
      player.moving = false;
      npc.moving = false;
      return;
    }
  }
}

function drawStatusUI() {
  push();

  imageMode(CENTER);
  rectMode(CORNER);
  textAlign(LEFT, CENTER);
  textFont("Arial");

  let panelX = 18;
  let panelY = 18;
  let panelW = 520;
  let panelH = 68;

  noStroke();
  fill(255, 235);
  rect(panelX, panelY, panelW, panelH, 14);

  let heartSize = 32;
  let heartGap = 7;
  let heartStartX = panelX + 25;
  let heartY = panelY + panelH / 2;

  for (let i = 0; i < gameState.maxHp; i++) {
    let img = i < statusUI.hp ? hpFullIcon : hpEmptyIcon;
    image(img, heartStartX + i * (heartSize + heartGap), heartY, heartSize, heartSize);
  }

  let aqX = panelX + 230;
  let aqY = panelY + 20;
  let aqW = 190;
  let aqH = 22;

  fill(30);
  textSize(18);
  text("AQ", aqX, panelY + panelH / 2);

  let barX = aqX + 38;
  let barY = aqY + 4;

  stroke(40);
  strokeWeight(2);
  fill(235);
  rect(barX, barY, aqW, aqH, 8);

  let aqPercent = constrain(statusUI.aq / gameState.maxAqToWin, 0, 1);
  noStroke();
  fill(85, 205, 125);
  rect(barX + 2, barY + 2, (aqW - 4) * aqPercent, aqH - 4, 7);

  fill(30);
  textSize(16);
  text(statusUI.aq.toFixed(1) + "/" + gameState.maxAqToWin, barX + aqW + 10, barY + aqH / 2);

  pop();
}

function updateStatusUI() {
  statusUI.hp = constrain(gameState.hp, 0, gameState.maxHp);
  statusUI.aq = constrain(gameState.aq, 0, gameState.maxAqToWin);
}

function drawChoiceMenu() {
  drawMenuBackground();

  let iconSize = 96;
  let gap = 42;
  let totalW = iconSize * 3 + gap * 2;
  let startX = width / 2 - totalW / 2 + iconSize / 2;
  let y = height / 2;

  choiceButtons = [
    { x: startX, y: y, size: iconSize, icon: fistIcon, action: "fist" },
    { x: startX + iconSize + gap, y: y, size: iconSize, icon: palmIcon, action: "slap" },
    { x: startX + (iconSize + gap) * 2, y: y, size: iconSize, icon: speakIcon, action: "speak" }
  ];

  for (let btn of choiceButtons) drawIconButton(btn);
}

function drawFailChoiceMenu() {
  drawMenuBackground();

  let iconSize = 96;
  let gap = 42;
  let totalW = iconSize * 3 + gap * 2;
  let startX = width / 2 - totalW / 2 + iconSize / 2;
  let y = height / 2;

  failChoiceButtons = [
    { x: startX, y: y, size: iconSize, icon: leaveIcon, action: "leave" },
    { x: startX + iconSize + gap, y: y, size: iconSize, icon: fistIcon, action: "fist" },
    { x: startX + (iconSize + gap) * 2, y: y, size: iconSize, icon: palmIcon, action: "slap" }
  ];

  for (let btn of failChoiceButtons) drawIconButton(btn);
}

function drawMenuBackground() {
  push();
  rectMode(CENTER);
  noStroke();
  fill(0, 120);
  rect(width / 2, height / 2, width, height);

  fill(255, 245);
  stroke(40);
  strokeWeight(3);
  rect(width / 2, height / 2, 470, 190, 18);
  pop();
}
function drawExplanationScene() {
  background(0);

  textFont("SimHei");
  textSize(introFontSize);
  textAlign(CENTER, CENTER);
  fill(255);

  let explanationText =
    "↑ ↓ ← → 移动\n\n" +
    "阻止站台烟民吸烟\n" +
    "提升空气质量 AQ\n" +
    "AQ达到5即可胜利\n\n" +
    "生命值归零\n" +
    "游戏失败";

  text(explanationText, width / 2, height / 2 - 30);

  textSize(22);
  text("点击任意位置退出说明", width / 2, height - 70);
}
function drawIconButton(btn) {
  let hovering = isMouseOverButton(btn);
  let s = hovering ? btn.size * 1.12 : btn.size;

  push();
  imageMode(CENTER);

  noStroke();
  fill(hovering ? 255 : 235);
  rectMode(CENTER);
  rect(btn.x, btn.y, s + 24, s + 24, 18);

  tint(hovering ? 255 : 245);
  image(btn.icon, btn.x, btn.y, s, s);
  noTint();

  pop();
}
function isMouseOverRectButton(btn) {
  return (
    mouseX > btn.x - btn.w / 2 &&
    mouseX < btn.x + btn.w / 2 &&
    mouseY > btn.y - btn.h / 2 &&
    mouseY < btn.y + btn.h / 2
  );
}
function isMouseOverButton(btn) {
  return (
    mouseX > btn.x - btn.size / 2 &&
    mouseX < btn.x + btn.size / 2 &&
    mouseY > btn.y - btn.size / 2 &&
    mouseY < btn.y + btn.size / 2
  );
}
function mousePressed() {
  if (screenState === "menu") {
  userStartAudio();
  startIntroText();
  screenState = "intro";
  return;
}

  if (screenState === "intro") {
    handleIntroClick();
    return;
  }

  if (screenState === "explanation") {
  screenState = "intro";
  showStartButton = true;
  startButtonAlpha = 255;
  return;
}
  if (gameState.ended) {
  if (mouseButton === RIGHT && endPage === "story" && endTextShown.length >= endTextFull.length) {
    endPage = "stats";
    endStatsStarted = true;
    endStatsStartTime = millis();
    endSummaryStarted = false;
    endStatsShown = "";
    endSummaryShown = "";
  }
  return false;
}

  // 下面保留你原来的正式游戏 mousePressed 内容

  if (physicalSlapActive) {
    handlePhysicalSlapClick();
    return;
  }

  if (physicalPunchActive) {
    handlePhysicalPunchClick();
    return;
  }

  if (dialogueActive) {
    handleDialogueClick();
    return;
  }

  if (choiceActive) {
    for (let btn of choiceButtons) {
      if (isMouseOverButton(btn)) {
        if (btn.action === "fist") {
          startPhysicalPunch(currentNpc);
        } else if (btn.action === "slap") {
          startPhysicalSlap(currentNpc);
        } else if (btn.action === "speak") {
          startCivilDialogue(currentNpc);
        }
        return;
      }
    }
  }
}

function startIntroText() {
  introPage = 0;
  introLine = 0;
  introCharCount = 0;
  showStartButton = false;
  startButtonAlpha = 0;
}

function handleIntroClick() {
  userStartAudio();

  if (showStartButton) {
  stopTypingSound();

  if (isMouseOverRectButton(startButton)) {
    screenState = "playing";
    startBackgroundMusic();
    return;
  }

  if (isMouseOverRectButton(explanationButton)) {
    screenState = "explanation";
    return;
  }

  return;
}

  let lines = introPages[introPage];
  let currentLine = lines[introLine];

  if (introCharCount < currentLine.length) {
    introCharCount = currentLine.length;
    return;
  }

  introLine++;
  introCharCount = 0;

  if (introLine >= lines.length) {
    if (introPage === introPages.length - 1) {
      showStartButton = true;
      startButtonAlpha = 0;
      return;
    }

    introPage++;
    introLine = 0;
    introCharCount = 0;
  }
}

function startCivilDialogue(npc) {
  if (!npc || dialogueActive) return;

  choiceActive = false;
  failChoiceActive = false;

  currentNpc = npc;
  dialogueNpc = npc;
  player.moving = false;
  npc.moving = false;

  showDialogue("player", "高铁站台禁止吸烟。", function () {});
}

function showDialogue(speaker, text, onComplete) {
  dialogueActive = true;
  dialogueSpeaker = speaker;
  dialogueText = text;
  dialogueShownText = "";
  dialogueStartTime = millis();
  dialogueTypingDone = false;
  dialogueOnComplete = onComplete;
}

function updateDialogue() {
  if (!dialogueActive) return;

  let charCount = floor((millis() - dialogueStartTime) / DIALOGUE_CHAR_INTERVAL);
  charCount = constrain(charCount, 0, dialogueText.length);
  dialogueShownText = dialogueText.substring(0, charCount);

  if (charCount >= dialogueText.length && !dialogueTypingDone) {
    dialogueTypingDone = true;
    if (dialogueOnComplete) dialogueOnComplete();
  }
}

function drawDialogueBubble() {
  if (!dialogueActive) return;

  let speakerObj = dialogueSpeaker === "player" ? player : dialogueNpc;
  if (!speakerObj) return;

  let screenX = speakerObj.x - cameraX;
  let screenY = speakerObj.y - 155;

  let bubbleW = 290;
  let bubbleH = 86;

  let bubbleX = screenX < width * 0.55 ? screenX + 150 : screenX - 150;
  let bubbleY = screenY;

  bubbleX = constrain(bubbleX, bubbleW / 2 + 18, width - bubbleW / 2 - 18);
  bubbleY = constrain(bubbleY, bubbleH / 2 + 18, height - bubbleH / 2 - 18);

  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont("SimHei");
  textSize(22);

  fill(255);
  stroke(30);
  strokeWeight(3);
  rect(bubbleX, bubbleY, bubbleW, bubbleH, 18);

  fill(0);
  noStroke();
  text(dialogueShownText, bubbleX, bubbleY, bubbleW - 30, bubbleH - 22);

  if (dialogueTypingDone) {
    textSize(16);
    fill(90);
    text("点击继续", bubbleX, bubbleY + bubbleH / 2 - 14);
  }

  pop();
}

function handleDialogueClick() {
  if (!dialogueTypingDone) return;

  if (dialogueSpeaker === "player") {
    decideCivilResult();
    return;
  }

  if (dialogueSpeaker === "npc") {
    finishCivilDialogue();
  }
}

function decideCivilResult() {
  if (!dialogueNpc) return;

  let rate = CIVIL_SUCCESS_RATE[dialogueNpc.id];
  let success = Math.random() < rate;
  civilResultPending = success ? "success" : "fail";

  let npcSuccessLines = [
    "哦，好的。",
    "不好意思，我没注意。"
  ];

  let npcFailLines = [
    "关你屁事。",
    "我还没让你a我烟钱呢。",
    "呃。。。你能把我怎样？"
  ];

  let lines = success ? npcSuccessLines : npcFailLines;
  let npcLine = random(lines);

  showDialogue("npc", npcLine, function () {});
}

function finishCivilDialogue() {
  let npc = dialogueNpc;
  let result = civilResultPending;

  dialogueActive = false;
  dialogueSpeaker = null;
  dialogueText = "";
  dialogueShownText = "";
  dialogueTypingDone = false;
  dialogueOnComplete = null;
  dialogueNpc = null;
  civilResultPending = null;

  if (result === "success") civilSuccess(npc);
  else civilFail(npc);
}

function chooseCivil(npc) {
  startCivilDialogue(npc);
}

function civilSuccess(npc) {
  stats.civilCount++;
  changeAQ(gameState.civilSuccessAqGain);
  removeNpc(npc);
  endInteraction();
}

function civilFail(npc) {
  stats.civilCount++;
  changeAQ(-gameState.civilFailAqPenalty);

  if (npc) {
    npc.talked = true;
    npc.moving = false;
  }

  endInteraction();
}




function choosePhysical(type, npc) {
  if (!npc) return;

  choiceActive = false;
  failChoiceActive = false;

  changeAQ(gameState.physicalSuccessAqGain);
  changeHP(-gameState.physicalHpCost);

  removeNpc(npc);
  endInteraction();
}

function removeNpc(npc) {
  if (!npc) return;

  npc.removed = true;
  npc.talked = true;
  npc.moving = false;
}

function endInteraction() {
  choiceActive = false;
  failChoiceActive = false;
  currentNpc = null;
  failChoiceNpc = null;
  updateStatusUI();
}
function areAllNpcsFinished() {
  let npcs = [npc2, npc2b, npc3, npc3b, npc4, npc4b, npc5, npc5b];

  for (let npc of npcs) {
    if (!npc.talked && !npc.removed) {
      return false;
    }
  }

  return true;
}
function keyPressed() {
  if (physicalPunchActive) {
    if (keyCode === 32) {
      handlePunchSpace();
      return false;
    }
  }

  if (physicalSlapActive) {
    if (keyCode === 32) {
      handleSlapSpace();
      return false;
    }
  }
}
function changeAQ(amount) {
  gameState.aq += amount;
  gameState.aq = constrain(gameState.aq, 0, gameState.maxAqToWin);
  updateStatusUI();
  checkGameResult();
}

function changeHP(amount) {
  gameState.hp += amount;
  gameState.hp = constrain(gameState.hp, 0, gameState.maxHp);
  updateStatusUI();
  checkGameResult();
}

function updateAirDrop() {
  if (millis() - gameState.lastAirDropTime >= gameState.airDropEveryMs) {
    changeAQ(-gameState.airDropAmount);
    gameState.lastAirDropTime = millis();
  }
}

function checkGameResult() {
  if (gameState.ended) return;

  if (gameState.aq >= gameState.maxAqToWin) {
    gameWin();
  } else if (gameState.hp <= gameState.minHpToLose && gameState.aq < gameState.maxAqToWin) {
    gameOver();
  } else if (areAllNpcsFinished() && gameState.aq < gameState.maxAqToWin) {
    gameOver();
  }
}

function gameWin() {
  gameState.ended = true;
  playSuccessSound();
  endTextFull = "你成功进化了站台空气\n但没人知道你劝阻了多少人\n又打了多少人。";
  prepareEndStats();
}

function gameOver() {
  gameState.ended = true;
  playFailSound();
  endTextFull = "你没能撑到空气恢复正常\n烟还没灭\n你的巴掌已经失去了力量。";
  prepareEndStats();
}
function prepareEndStats() {
  endTextShown = "";
  endTextStartTime = millis();

  endStatsFull =
    "成功劝阻人数：" + stats.civilCount + "\n" +
    "被打人数：" + stats.physicalCount + "\n" +
    "空气质量：" + gameState.aq.toFixed(1) + "/" + gameState.maxAqToWin + "\n" +
    "剩余生命值：" + gameState.hp + "/" + gameState.maxHp;

  if (stats.civilCount >= stats.physicalCount) {
    endSummaryFull = "你尽可能保持了理智";
  } else {
    endSummaryFull = "你解决了问题\n至少表面解决了。";
  }

  endStatsShown = "";
  endSummaryShown = "";
  endStatsStarted = false;
  endSummaryStarted = false;
  endPage = "story";
}
function drawEndText() {
  push();

  rectMode(CENTER);
  noStroke();

  fill(0);
  rect(width / 2, height / 2, width, height);

  fill(255);
  textFont("SimHei");
  textSize(END_TEXT_SIZE);
  textAlign(CENTER, CENTER);

  if (endPage === "story") {
    let mainCount = floor((millis() - endTextStartTime) / END_TEXT_CHAR_INTERVAL);
    mainCount = constrain(mainCount, 0, endTextFull.length);
    endTextShown = endTextFull.substring(0, mainCount);

    text(endTextShown, width / 2, height / 2, 760, 260);

    if (mainCount >= endTextFull.length) {
      textSize(22);
      text("右键继续", width / 2, height / 2 + 190);
    }

    pop();
    return;
  }

  if (endPage === "stats") {
    let statsCount = floor((millis() - endStatsStartTime) / END_TEXT_CHAR_INTERVAL);
    statsCount = constrain(statsCount, 0, endStatsFull.length);
    endStatsShown = endStatsFull.substring(0, statsCount);

    textSize(END_TEXT_SIZE);
    text(endStatsShown, width / 2, height / 2 - 80, 760, 260);

    if (statsCount >= endStatsFull.length && !endSummaryStarted) {
      endSummaryStarted = true;
      endSummaryStartTime = millis();
    }

    if (endSummaryStarted) {
      let summaryCount = floor((millis() - endSummaryStartTime) / END_TEXT_CHAR_INTERVAL);
      summaryCount = constrain(summaryCount, 0, endSummaryFull.length);
      endSummaryShown = endSummaryFull.substring(0, summaryCount);

      textSize(END_TEXT_SIZE);
      text(endSummaryShown, width / 2, height / 2 + 180, 760, 160);
    }
  }

  pop();
}
function startPhysicalPunch(npc) {
  if (!npc || physicalPunchActive) return;
duckBackgroundMusic();
  choiceActive = false;
  failChoiceActive = false;
  dialogueActive = false;

  currentNpc = npc;
  physicalPunchNpc = npc;
  physicalPunchActive = true;
  physicalPunchState = "normal";
  physicalPunchHadHit = false;
  physicalPunchLocked = false;
  physicalPunchRecoverTime = 0;
physicalPunchCount = 0;
physicalPunchLine = "";
physicalPunchLineShown = "";
physicalPunchLineStartTime = 0;
physicalPunchLineActive = false;
  player.moving = false;
  npc.moving = false;
}
function startPhysicalSlap(npc) {
  if (!npc || physicalSlapActive) return;
duckBackgroundMusic();
  choiceActive = false;
  failChoiceActive = false;
  dialogueActive = false;

  currentNpc = npc;
  physicalSlapNpc = npc;
  physicalSlapActive = true;
  physicalSlapState = "normal";
  physicalSlapHadHit = false;
  physicalSlapLocked = false;
  physicalSlapRecoverTime = 0;
  physicalSlapCount = 0;

  player.moving = false;
  npc.moving = false;
}

function handleSlapSpace() {
  if (!physicalSlapActive || !physicalSlapNpc || physicalSlapLocked) return;
playSlapSound();
  physicalSlapLocked = true;
  physicalSlapCount++;

  if (!physicalSlapHadHit) {
    physicalSlapHadHit = true;
    startPhysicalSlapLine();
  }

  if (physicalSlapCount % 2 === 1) {
    physicalSlapState = "slapLeft";
  } else {
    physicalSlapState = "slapRight";
  }

  physicalSlapRecoverTime = millis() + SLAP_FLASH_TIME;
}
function startPhysicalSlapLine() {
  let lines = [
    "你竟然敢打我？！",
    "你找死！"
  ];

  physicalSlapLine = random(lines);
  physicalSlapLineShown = "";
  physicalSlapLineStartTime = millis();
  physicalSlapLineActive = true;
}

function updatePhysicalSlapLine() {
  if (!physicalSlapLineActive) return;

  let charCount = floor((millis() - physicalSlapLineStartTime) / PUNCH_DIALOGUE_CHAR_INTERVAL);
  charCount = constrain(charCount, 0, physicalSlapLine.length);

  physicalSlapLineShown = physicalSlapLine.substring(0, charCount);
}

function updatePhysicalSlapScene() {
  if (!physicalSlapActive) return;

  if (physicalSlapLocked && millis() >= physicalSlapRecoverTime) {
    physicalSlapState = "angry";
    physicalSlapLocked = false;
  }

  updatePhysicalSlapLine();
}

function drawPhysicalSlapScene() {
  if (!physicalSlapNpc) return;

  let npcId = physicalSlapNpc.id;
  let imgs = closeUpSlapSprites[npcId];
  if (!imgs) return;

  let npcImg = imgs.normal;

  if (physicalSlapState === "slapLeft") {
    npcImg = imgs.slapLeft;
  } else if (physicalSlapState === "slapRight") {
    npcImg = imgs.slapRight;
  } else if (physicalSlapState === "angry") {
    npcImg = imgs.angry;
  }

  push();

  imageMode(CORNER);
  noStroke();

  image(closeUpBg, 0, 0, width, height);

  fill(0, 45);
  rect(0, 0, width, height);

  let npcTargetH = height * 0.78;
  let ratio = npcTargetH / npcImg.height;
  let npcW = npcImg.width * ratio;
  let npcH = npcTargetH;

  let npcX = width * 0.09;
  let npcY = height * 0.15;

  image(npcImg, npcX, npcY, npcW, npcH);

  textFont("SimHei");

if (physicalSlapLineActive) {
  fill(0);
  textAlign(LEFT, TOP);
  textSize(PUNCH_DIALOGUE_TEXT_SIZE);
  text(
    physicalSlapLineShown,
    width * 0.56,
    height * 0.38,
    360,
    120
  );
}

fill(255, 245);
textAlign(CENTER, CENTER);
textSize(24);

if (physicalSlapHadHit && !physicalSlapLocked) {
  text("点击右侧空白处返回", width * 0.72, height * 0.62);
} else {
  text("按空格键", width * 0.72, height * 0.62);
}

  pop();
}

function handlePhysicalSlapClick() {
  if (!physicalSlapActive) return;

  if (!physicalSlapHadHit || physicalSlapLocked || physicalSlapState !== "angry") {
    return;
  }

  if (mouseX < width * 0.55) {
    return;
  }

  finishPhysicalSlap();
}

function finishPhysicalSlap() {
  let npc = physicalSlapNpc;
restoreBackgroundMusic();
  physicalSlapActive = false;
  physicalSlapNpc = null;
  physicalSlapState = "normal";
  physicalSlapHadHit = false;
  physicalSlapLocked = false;
  physicalSlapRecoverTime = 0;
  physicalSlapCount = 0;
  physicalSlapLine = "";
physicalSlapLineShown = "";
physicalSlapLineStartTime = 0;
physicalSlapLineActive = false;
startFightScene(npc);
  stats.physicalCount++;
  changeAQ(gameState.physicalSuccessAqGain);
  changeHP(-gameState.physicalHpCost);

  removeNpc(npc);
  endInteraction();
}

function handlePunchSpace() {
  if (!physicalPunchActive || !physicalPunchNpc || physicalPunchLocked) return;
playRandomScreamSound();
  physicalPunchLocked = true;
  physicalPunchCount++;

  if (!physicalPunchHadHit) {
    physicalPunchHadHit = true;
    startPhysicalPunchLine();
  }

  if (physicalPunchCount % 2 === 1) {
    physicalPunchState = "hitLeft";
  } else {
    physicalPunchState = "hitRight";
  }

  physicalPunchRecoverTime = millis() + PUNCH_FLASH_TIME;
}
function startPhysicalPunchLine() {
  let lines = [
    "你竟然敢打我？！",
    "你等着瞧！"
  ];

  physicalPunchLine = random(lines);
  physicalPunchLineShown = "";
  physicalPunchLineStartTime = millis();
  physicalPunchLineActive = true;
}
function updatePhysicalPunchScene() {
  if (!physicalPunchActive) return;

  if (physicalPunchLocked && millis() >= physicalPunchRecoverTime) {
    physicalPunchState = "angry";
    physicalPunchLocked = false;
  }

  updatePhysicalPunchLine();
}
function updatePhysicalPunchLine() {
  if (!physicalPunchLineActive) return;

  let charCount = floor((millis() - physicalPunchLineStartTime) / PUNCH_DIALOGUE_CHAR_INTERVAL);
  charCount = constrain(charCount, 0, physicalPunchLine.length);

  physicalPunchLineShown = physicalPunchLine.substring(0, charCount);
}
function drawPhysicalPunchScene() {
  if (!physicalPunchNpc) return;

  let npcId = physicalPunchNpc.id;
  let imgs = closeUpSprites[npcId];
  if (!imgs) return;

  let npcImg = imgs.normal;

  if (physicalPunchState === "hitLeft") {
  npcImg = imgs.hitLeft;
} else if (physicalPunchState === "hitRight") {
  npcImg = imgs.hitRight;
} else if (physicalPunchState === "angry") {
  npcImg = imgs.angry;
}

  push();

  imageMode(CORNER);
  noStroke();

  // 特写背景铺满屏幕
  image(closeUpBg, 0, 0, width, height);

  // 轻微暗角，让人物更突出
  fill(0, 45);
  rect(0, 0, width, height);

  // NPC 显示在画面左侧
  let npcTargetH = height * 0.78;
  let ratio = npcTargetH / npcImg.height;
  let npcW = npcImg.width * ratio;
  let npcH = npcTargetH;

  let npcX = width * 0.09;   // NPC 左右位置在这里调，数字越大越靠右
  let npcY = height * 0.15;  // NPC 上下位置在这里调，数字越大越靠下

  image(npcImg, npcX, npcY, npcW, npcH);

  // 右侧空白区域提示
  // 右侧空白区域台词 / 提示
textAlign(CENTER, CENTER);
textFont("SimHei");

if (physicalPunchLineActive) {
  fill(0);
  textAlign(LEFT, TOP);
  textSize(PUNCH_DIALOGUE_TEXT_SIZE);
  text(
    physicalPunchLineShown,
    width * 0.56,
    height * 0.38,
    360,
    120
  );
}

fill(255, 245);
textSize(24);

if (physicalPunchHadHit && !physicalPunchLocked) {
  text("点击右侧空白处返回", width * 0.72, height * 0.62);
} else {
  text("按空格键", width * 0.72, height * 0.62);
}

  pop();
}

function handlePhysicalPunchClick() {
  if (!physicalPunchActive) return;

  // 必须至少按过一次空格，并且 NPC 已经恢复到 angry 状态，才允许退出
  if (!physicalPunchHadHit || physicalPunchLocked || physicalPunchState !== "angry") {
    return;
  }

  // 只有点击画面右侧空白区域才退出
  if (mouseX < width * 0.55) {
    return;
  }

  finishPhysicalPunch();
}
function startFightScene(npc) {
  if (!npc) return;
playFightSound();
  fightSceneActive = true;
  fightSceneNpcId = npc.id;

  // 出现在玩家和 NPC 相遇的位置
  fightSceneX = (player.x + npc.x) / 2;
  fightSceneY = (player.y + npc.y) / 2;

  fightSceneStartTime = millis();
}

function updateFightScene() {
  if (!fightSceneActive) return;

  if (millis() - fightSceneStartTime >= FIGHT_SCENE_DURATION) {
    fightSceneActive = false;
    fightSceneNpcId = null;
  }
}

function drawFightScene() {
  if (!fightSceneActive || !fightSceneNpcId) return;

  let frames = fightSprites[fightSceneNpcId];
  if (!frames || frames.length === 0) return;

  let frameIndex = floor((millis() - fightSceneStartTime) / FIGHT_FRAME_INTERVAL) % frames.length;
  let img = frames[frameIndex];

  drawImageByHeight(img, fightSceneX, fightSceneY, FIGHT_SCENE_HEIGHT);
}
function finishPhysicalPunch() {
  let npc = physicalPunchNpc;

  startFightScene(npc);
restoreBackgroundMusic();
  physicalPunchActive = false;
  physicalPunchNpc = null;
  physicalPunchState = "normal";
  physicalPunchHadHit = false;
  physicalPunchLocked = false;
  physicalPunchRecoverTime = 0;
  physicalPunchCount = 0;

  physicalPunchLine = "";
  physicalPunchLineShown = "";
  physicalPunchLineStartTime = 0;
  physicalPunchLineActive = false;
stats.physicalCount++;
  changeAQ(gameState.physicalSuccessAqGain);
  changeHP(-gameState.physicalHpCost);

  removeNpc(npc);
  endInteraction();
}
function startBackgroundMusic() {
  if (!bgMusic || bgMusic.isPlaying()) return;

  bgMusic.setVolume(BG_MUSIC_VOLUME);
  bgMusic.loop();
}

function stopBackgroundMusic() {
  if (bgMusic && bgMusic.isPlaying()) {
    bgMusic.stop();
  }
}

function duckBackgroundMusic() {
  if (bgMusic && bgMusic.isPlaying()) {
    bgMusic.setVolume(BG_MUSIC_DUCK_VOLUME, 0.25);
  }
}

function restoreBackgroundMusic() {
  if (bgMusic && bgMusic.isPlaying()) {
    bgMusic.setVolume(BG_MUSIC_VOLUME, 0.25);
  }
}

function playFightSound() {
  if (fightSound) fightSound.play();
}

function playSlapSound() {
  if (slapSound) slapSound.play();
}

function playRandomScreamSound() {
  if (!screamSounds || screamSounds.length === 0) return;

  let s = random(screamSounds);
  if (s) s.play();
}

function startTypingSound() {
  if (!keyboardSound) return;

  if (!keyboardSound.isPlaying()) {
    keyboardSound.setVolume(KEYBOARD_VOLUME);
    keyboardSound.loop();
  }
}

function stopTypingSound() {
  if (keyboardSound && keyboardSound.isPlaying()) {
    keyboardSound.stop();
  }
}

function playSuccessSound() {
  stopAllGameplaySounds();

  if (successSound) {
    successSound.stop();
    successSound.play();
  }
}

function playFailSound() {
  stopAllGameplaySounds();

  if (failSound) {
    failSound.stop();
    failSound.play();
  }
}
function stopAllGameplaySounds() {
  if (bgMusic && bgMusic.isPlaying()) {
    bgMusic.stop();
  }

  if (fightSound && fightSound.isPlaying()) {
    fightSound.stop();
  }

  if (slapSound && slapSound.isPlaying()) {
    slapSound.stop();
  }

  if (keyboardSound && keyboardSound.isPlaying()) {
    keyboardSound.stop();
  }

  for (let s of screamSounds) {
    if (s && s.isPlaying()) {
      s.stop();
    }
  }
}
function resizeCanvasToWindow() {
  let scaleX = windowWidth / width;
  let scaleY = windowHeight / height;
  let scaleFactor = min(scaleX, scaleY);

  let displayW = width * scaleFactor;
  let displayH = height * scaleFactor;

  let canvas = document.querySelector("canvas");
  if (!canvas) return;

  canvas.style.width = displayW + "px";
  canvas.style.height = displayH + "px";
  canvas.style.display = "block";
  canvas.style.position = "absolute";
  canvas.style.left = (windowWidth - displayW) / 2 + "px";
  canvas.style.top = (windowHeight - displayH) / 2 + "px";
}

function windowResized() {
  resizeCanvasToWindow();
}
