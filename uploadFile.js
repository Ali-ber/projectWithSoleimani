const body = document.querySelector(".body");
const menuHeader = document.querySelector(".menuHeader");
const backMenuHeader = document.querySelector(".backMenuHeader");
const checkbox = document.querySelector("#checkbox2");
const themeToggle = document.querySelector(".input");
const content = document.querySelector(".content");
const down = document.querySelector("#down");
const checkboxInput = document.querySelectorAll(".checkbox-input");

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


  
// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("my-form")

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('active')
}

function handleDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files

  handleFiles(files)
}

let uploadProgress = []
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
  progressBar.value = 0
  uploadProgress = []

  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0)
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
  progressBar.value = total
}

function handleFiles(files) {
  files = [...files]
  initializeProgress(files.length)
  files.forEach(uploadFile)
  files.forEach(previewFile)
}

function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    let video = document.createElement('video')
    video.src = reader.result
    document.getElementById('gallery').appendChild(video)
  }
}

function uploadFile(file, i) {
  var url = 'https://api.cloudinary.com/v1_1/joezimim007/video/upload'
//   var url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
  })

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgress(i, 100) // <- Add this
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  })

  formData.append('upload_preset', 'ujpu6gyk')
  formData.append('file', file)
  xhr.send(formData)
}

$(document).ready(function(){
	$('#baceSorting').change(function(){
		var baceSorting = $(this).val();
		if (baceSorting == 'تصاویر') {
			$('#c1').text('kahak');
			$('#c2').text('langerood');
			$('#c3').text('ghanavat');
		}
		else if (baceSorting == 'ویدئوها') {
			$('#c1').text('firozkooh');
			$('#c2').text('lavasan');
			$('#c3').text('tajrish');
		}
		else {
			$('#c1').text('saveh');
			$('#c2').text('khomein');
			$('#c3').text('tafresh');
		}
	});
});