let totalFiles = [];
const maxFiles = 20;
const bucketName = "**YOUR S3 BUCKET NAME HERE**";

document.addEventListener("DOMContentLoaded", function () {
  const selectBtn = document.querySelector(".select-btn");
  const fileInput = document.getElementById("select-file-input");
  const dropZone = document.querySelector(".dots");
  const submitBtn = document.getElementById("submit-button");

  // Select file button definition
  selectBtn.addEventListener("click", function () {
    fileInput.click();
  });

  // Select file button events
  fileInput.addEventListener("change", function () {
    handleFiles(Array.from(fileInput.files));
  });

  // Drag and drop events
  dropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
    dropZone.classList.add("drag-over");
  });

  dropZone.addEventListener("dragleave", function (event) {
    dropZone.classList.remove("drag-over");
  });

  dropZone.addEventListener("drop", function (event) {
    event.preventDefault();
    dropZone.classList.remove("drag-over");
    handleFiles(Array.from(event.dataTransfer.files));
  });

  // Submit button events - run uploadFile() function for each file
  submitBtn.addEventListener("click", function () {
    totalFiles.forEach((file) => {
      uploadFile(file); // Upload each file
    });
  });
});

// Handle new files (either selected or dropped)
function handleFiles(newFiles) {
  if (totalFiles.length + newFiles.length > maxFiles) {
    alert(`Please select no more than ${maxFiles} files.`);
    return;
  }

  totalFiles = totalFiles.concat(newFiles);
  updateFileGrid(newFiles);
}

// Update the file grid display
function updateFileGrid(files) {
  const filesContainer = document.getElementById("file-grid");
  files.forEach((file) => {
    const fileSquare = document.createElement("div");
    fileSquare.classList.add("file-square");

    if (file.type && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = "Thumbnail";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        fileSquare.appendChild(img);
      };
      reader.readAsDataURL(file);
    } else {
      fileSquare.textContent = file.name;
    }

    filesContainer.appendChild(fileSquare);
  });
}

// Popup events for successful upload message to the user
function showPopup(message, duration = 3000) {
  // Create a new popup div
  let popup = document.createElement('div');
  popup.classList.add('popup');
  popup.textContent = message;

  // Append the popup to the container
  let container = document.getElementById('popup-container');
  container.appendChild(popup);

  // Remove the popup after 'duration' milliseconds
  setTimeout(() => {
      popup.style.opacity = 0;
      popup.addEventListener('transitionend', () => popup.remove());
  }, duration);
}

// Upload file to S3 function (for one file)
async function uploadFile(file) {
  var s3 = new AWS.S3();
  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: bucketName,
      Key: file.name,
      Body: file,
    },
  });
  try {
    const data = await upload.promise();
    showPopup("Successfully uploaded file: " + file.name);
  } catch (err) {
    console.error(
      "There was an error uploading file: " + file.name + " - " + err.message
    );
  }
}
