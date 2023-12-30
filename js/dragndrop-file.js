document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.querySelector('.dots'); 
    let totalFiles = []; 
  
    dropZone.addEventListener('dragover', function(event) {
      event.preventDefault();
      dropZone.classList.add('drag-over'); 
    });
  
    dropZone.addEventListener('dragleave', function(event) {
      dropZone.classList.remove('drag-over'); 
    });
  
    dropZone.addEventListener('drop', function(event) {
      event.preventDefault();
      dropZone.classList.remove('drag-over');
  
      const newFiles = Array.from(event.dataTransfer.files);
      if (totalFiles.length + newFiles.length > 20) {
        alert('You cannot upload more than 20 files.');
        return;
      }
  
      totalFiles = totalFiles.concat(newFiles); 
      displayFiles(newFiles);
    });
  
    function displayFiles(files) {
      const filesContainer = document.getElementById('file-grid');
  
      files.forEach(file => {
        const fileSquare = document.createElement('div');
        fileSquare.classList.add('file-square');
  
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.classList.add('file-thumbnail');
            fileSquare.appendChild(img);
          };
          reader.readAsDataURL(file);
        } else {
          const textNode = document.createTextNode(file.name);
          fileSquare.appendChild(textNode);
        }
        filesContainer.appendChild(fileSquare);
      });
    }
  });
  