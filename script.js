const body = document.querySelector(".body");
const menuHeader = document.querySelector(".menuHeader");
const backMenuHeader = document.querySelector(".backMenuHeader");
const checkbox = document.querySelector("#checkbox2");
const themeToggle = document.querySelector(".input");
const content = document.querySelector(".content");
const down = document.querySelector("#down");

themeToggle.checked = false;
checkbox.checked = false;
function toggleMenu() {
    if (checkbox.checked == false) {
        menuHeader.style.width = "60px";
        backMenuHeader.style.backgroundColor = "none";
        backMenuHeader.style.transition = "all 0.75s";
        backMenuHeader.style.display = "none";
    }else{
        menuHeader.style.width = "140px";
        backMenuHeader.style.backgroundColor = "#f5ab356c";
        backMenuHeader.style.transition = "all 0.75s";
        backMenuHeader.style.display = "block";
    }
}
function themeToggleBody() {
    if (themeToggle.checked == false) {
        body.style.backgroundColor = "#ffffff";
        body.style.transition = "all 1s";
    }else{
        body.style.backgroundColor = "#373737";
        body.style.transition = "all 1s";
    }
}
function downUp(){
    if (content.style.paddingBottom == "400px") {
        content.style.paddingBottom = "0px";
        down.style.transform = "rotate(0deg)";
    }else{
        content.style.paddingBottom = "400px";
        down.style.transform = "rotate(180deg)";
    }
}
function contentHover() {
    content.style.paddingBottom = "400px";
    down.style.transform = "rotate(180deg)";
}
function normal() {
    content.style.paddingBottom = "0px";
    down.style.transform = "rotate(0deg)";
}

// Audio

document.addEventListener("DOMContentLoaded", (event) => {
  const controlBtn = document.getElementById("play-pause");
  let track = document.getElementById("track"),
    duration = track.duration, // Duration of audio clip (NaN here as the track is not loaded)
    playhead = document.getElementById("playhead"), // playhead
    timeline = document.getElementById("timeline"), // timeline
    timelineWidth = timeline.offsetWidth - playhead.offsetWidth,
    source = controlBtn.getAttribute("data-audio"),
    leftTimer = document.getElementById("is-left"),
    rightTimer = document.getElementById("is-right"),
    repeatButton = document.getElementsByClassName("icon-repeat");

  if (!track) return;

  // Update the track duration when the track is loaded.
  track.addEventListener(
    "canplaythrough",
    function () {
      duration = track.duration;
    },
    false
  );

  function playPause() {
    null === track.getAttribute("src") ? track.setAttribute("src", source) : "";

    if (track.paused) {
      track.play();
      controlBtn.className = "pause";
    } else {
      track.pause();
      controlBtn.className = "play";
    }
  }

  controlBtn.addEventListener("click", playPause);

  track.addEventListener("ended", function () {
    controlBtn.className = "play";
    track.currentTime = 0; // reset the playhead

    // Let's check if the repeat button is on, then play the track again.
    let times = repeatButton[0].getAttribute("repeat");
    if (times > 0) {
      controlBtn.className = "";
      controlBtn.className = "pause";
      track.play();
    }
  });

  // timeupdate event listener
  track.addEventListener("timeupdate", timeUpdate, false);

  // makes timeline clickable
  timeline.addEventListener(
    "click",
    function (event) {
      moveplayhead(event);
      track.currentTime = duration * clickPercent(event);
    },
    false
  );

  // Moves playhead as user clicks
  function moveplayhead(event) {
    let newMargLeft = event.clientX - getPosition(timeline);

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
      playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
      playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
      playhead.style.marginLeft = timelineWidth + "px";
    }
  }

  function getPosition(el) {
    return el.getBoundingClientRect().left;
  }

  // returns decimal number of the total timelineWidth
  function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;
  }

  // Time update
  function timeUpdate() {
    let playPercent = timelineWidth * (track.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    scrub.style.width = playPercent + "px";

    // Current time
    document.getElementById("duration-time").innerHTML = formatSecondsAsTime(
      duration
    );
    document.getElementById("current-time").innerHTML = formatSecondsAsTime(
      Math.floor(track.currentTime)
    );
  }

  // Synchronizes playhead position with current point in audio
  function formatSecondsAsTime(secs, format) {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - hr * 3600) / 60);
    let sec = Math.floor(secs - hr * 3600 - min * 60);

    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }

    return min + ":" + sec;
  }
});





// add active class in selected tab
const list = document.querySelectorAll('.list');
  function activeLink(){
    list.forEach((item) =>
    item.classList.remove('actived'));
    this.classList.add('actived');
  }
  list.forEach((item) =>
  item.addEventListener('click',activeLink));

  document.querySelectorAll('.moreDescription').forEach(button => { 
    button.addEventListener('click', () => { 
      const descriptionTxt = button.closest('.descriptionTxt')
      const info = descriptionTxt.getAttribute('data-info')
      const description = new Popup({
        id: "disclaimer",
        title: "توضیحات",
        content:
        `{custom-style}[${info}]`,
        sideMargin: "2.9vw",
        titleColor: "#fff",
        textColor: "#fff",
        backgroundColor: "#c5c5c57b",
        closeColor: "#fff",
        fontSize: "13px",
        linkColor: "#888",
        hideTitle: true,
        css: `
            .custom-style {
                font-family: "peydaMedium";
                height:10px;
                overflow: auto;
            }`,
      })
      description.show()
    }); 
  }); 


