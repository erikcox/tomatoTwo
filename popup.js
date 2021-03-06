const userObject = {
  coder1: {
    name,
    driver: true
  },
  coder2: {
    name,
    driver: false
  },
  intervalCount: 0,
  intervalLength: 25,

  setName(coder, name) {
    this[coder].name = name;
  },

  setRole(coder, role) {
    this[coder].driver = role === "Driver" ? true : false;
  },

  setIntervalLength(num) {
    this.intervalLength = num;
  },

  intervalCompleter() {
    this.coder1.driver = !this.coder1.driver;
    this.coder2.driver = !this.coder2.driver;
    this.intervalCount++;
  }
};

const handlers = {
  setName() {
    let coder1NameInput = document.getElementById("coder1NameInput").value;
    let coder2NameInput = document.getElementById("coder2NameInput").value;
    userObject.setName("coder1", coder1NameInput);
    userObject.setName("coder2", coder2NameInput);
    localStorage.setItem("coder1", coder1NameInput);
    localStorage.setItem("coder2", coder2NameInput);
    coder1NameInput = "";
    coder2NameInput = "";
  },
  setRole() {
    const role1 = document.querySelector("input[name=Role1]:checked").value;
    const role2 = document.querySelector("input[name=Role2]:checked").value;
    userObject.setRole("coder1", role1);
    userObject.setRole("coder2", role2);
  },
  setInterval() {
    let intervalLength = document.getElementById("intervalLengthInput").value;
    userObject.setIntervalLength(intervalLength);
  }
};

const view = {
  createPlanningTemplate() {
    const body = document.getElementById("theBody");
    const planningTemplateHtml = `<section id="planningTemplate">
      <p>Welcome to Pear Programming, where Pair Programming + Pomodoro Technique = Power Programming Productivity! Let's go over our process:</p>
      <ol>
        <li>
          <span>Pear Planning</span>: <span>pick</span> a <span>core</span> task; slice it up into smaller tasks. Then, bite off a small piece of each of those, and chew it into even smaller tasks. Maybe do it one more time. Ok, one more.
      </li>
        <li>
          <span>Pear Setup</span>: once your plan is all set, enter your names, and decide who will be navigator and driver first.
      </li>
        <li>
          <span>Pear Programming</span>: after each interval (we recommend 25 minutes to start), switch roles, review your code, and take a quick break. You earned it!
      </li>
        <li>
          <span>Sweet sweet feedback</span>: your programming might be over, but the learning has just begun. Hit the feedback button for a sweet roadmap to problem solving nirvana.
      </li>
        <li>
          <span>Never let go, Jack</span>: if you you feel like you're drowning in cold cold code, click the "Halp!" button anytime, and we'll put you in touch with our in-house problem solving guru right away.
      </li>
      </ol>
      <p>Before we get started, let's <span id="emphatic">plan</span> our work! Did you plan it? Are you sure? You're totally sure you have a plan? Ok, maybe go check once more. If you're not sure, here's this lovely quote from Abraham Lincoln about planning your work:</p>
      <p id="quote">"Give me six hours to chop down a tree and I will spend the first four sharpening the axe." - Abraham Lincoln</p>
      <p>Sooooooooo.....what are your names?</p>

      <div>
        <input id="coder1NameInput" type="text" name="Coder1" placeholder="Coder 1" autofocus>
          <input type="radio" name="Role1" value="Driver" checked>Driver
      <input type="radio" name="Role1" value="Navigator">Navigator
    <div>
                <div>
                  <input id="coder2NameInput" type="text" name="Coder2" placeholder="Coder 2">
                    <input type="radio" name="Role2" value="Driver">Driver
      <input type="radio" name="Role2" value="Navigator" checked>Navigator
    </div>
                      <div>
                        <input id="intervalLengthInput" type="number" name="timer-interval" placeholder="25">
    </div>
    </section>`;

    const timerHtml = `<div id="timer-container">
    <div id="timer">
    <!-- Timer circle -->
    <div class="circle">
      <svg width="300" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(110,110)">
          <circle r="100" class="e-c-base" />
          <g transform="rotate(-90)">
            <circle r="100" class="e-c-progress" />x
            <g id="e-pointer">
              <circle cx="100" cy="0" r="8" class="e-c-pointer" />
            </g>
          </g>
        </g>
      </svg>
    </div>
    <!-- Timer controls -->
    <div class="controlls">
      <div class="display-remain-time">00:30</div>
      <button class="play" id="pause"></button>
    </div>
  </div>
  <div id="buttons">
    <a href="#" id="switch">Switch | </a>
    <a href="#" id="reset"> Reset</a>
    </div>
    <div id="coder-1">
  Driver: ${localStorage.getItem("coder1")}
  </div>
  <div id="coder-2">
  Navigator: ${localStorage.getItem("coder2")}
  </div>
    </div>
  </div>`;

    body.insertAdjacentHTML("beforeend", planningTemplateHtml);
    const firstStartButton = this.createFirstStartButton();
    body.appendChild(firstStartButton);
    body.insertAdjacentHTML("beforeend", timerHtml);
  },

  createHelpDeskTemplate() {},
  createFeedBackTemplate() {},

  createTimerView() {
    const body = document.getElementById("theBody");
    const timerHtml = `<div id="timer-container"></div><div id="timer">
    <!-- Timer circle -->
    <div class="circle">
      <svg width="300" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(110,110)">
          <circle r="100" class="e-c-base" />
          <g transform="rotate(-90)">
            <circle r="100" class="e-c-progress" />
            <g id="e-pointer">
              <circle cx="100" cy="0" r="8" class="e-c-pointer" />
            </g>
          </g>
        </g>
      </svg>
    </div>
    <!-- Timer controls -->
    <div class="controlls">
      <div class="display-remain-time">00:30</div>
      <button class="play" id="pause"></button>
    </div>
  </div>
  <div id="buttons">
    <a href="#" id="switch">Switch | </a>
    <a href="#" id="reset"> Reset</a>
    </div>
  </div>
  </div>`;
    body.insertAdjacentHTML("beforeend", timerHtml);
    const resumeButton = this.createLaterStartButton();
    body.appendChild(resumeButton);
    this.firststartButtonListener();
  },

  createFirstStartButton() {
    //stuff
    const firstStartbutton = document.createElement("button");
    firstStartbutton.className = "startButton";
    firstStartbutton.id = "startPearing";
    firstStartbutton.textContent = "Start Pearing";
    return firstStartbutton;
  },

  // Resume Pairing button
  createLaterStartButton() {
    const startButton = document.createElement("button");
    startButton.className = "startButton";
    startButton.textContent = "Resume Pearing";
    startButton.id = "resumePearing";
    return startButton;
  },

  createHelpDeskButton() {},

  createEndPearingButton() {},

  // Start Pairing button
  firststartButtonListener() {
    const firstStartButton = document.getElementById("startPearing");
    const timerBox = $("#timer-container");
    firstStartButton.addEventListener("click", function(event) {
      const elementClicked = event.target;
      if (elementClicked.id === "startPearing") {
        handlers.setName();
        handlers.setRole();
        handlers.setInterval();
        document.getElementById("planningTemplate").style.display = "none";
        // view.createTimerView();

        timerBox.css("display", "block");
        timerBox.show();

        console.log(userObject);
      }
    });
  }
};

view.createPlanningTemplate();
// view.createFirstStartButton();
view.firststartButtonListener();
