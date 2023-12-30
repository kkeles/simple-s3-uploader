let totalFiles = [];
const maxFiles = 20;
const bucketName = "simples3uploadskk";

document.addEventListener("DOMContentLoaded", function () {
  const selectBtn = document.querySelector(".select-btn");
  const fileInput = document.getElementById("select-file-input");
  const dropZone = document.querySelector(".dots");
  const submitBtn = document.getElementById("submit-button");

  // File selection via button
  selectBtn.addEventListener("click", function () {
    fileInput.click();
  });

  // Handle file selection
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

  // Submit button event
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

// Upload file to S3
async function uploadFile(file) {
  var s3 = new AWS.S3(); // Ensure AWS SDK is configured correctly

  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: bucketName,
      Key: file.name,
      Body: file,
    },
  });

  try {
    const data = await upload.promise();
    console.log("Successfully uploaded file: " + file.name);
  } catch (err) {
    console.error(
      "There was an error uploading file: " + file.name + " - " + err.message
    );
  }
}