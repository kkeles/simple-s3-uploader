document.addEventListener('DOMContentLoaded', function() {
    const selectBtn = document.querySelector('.select-btn');
    const fileInput = document.getElementById('select-file-input');
    const maxFiles = 20;
    let totalFiles = [];
  
    selectBtn.addEventListener('click', function() {
      fileInput.click();
    });
  
    fileInput.addEventListener('change', function() {
      if (totalFiles.length + fileInput.files.length > maxFiles) {
        alert(`Please select no more than ${maxFiles} files.`);
        return;
      }
  
      const newFiles = Array.from(fileInput.files);
      totalFiles = totalFiles.concat(newFiles);
      const filesContainer = document.getElementById('file-grid');
  
      newFiles.forEach(file => {
        const fileSquare = document.createElement('div');
        fileSquare.classList.add('file-square');
  
        if (file.type && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Thumbnail';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            fileSquare.appendChild(img);
          };
          reader.readAsDataURL(file);
        } else {
          fileSquare.textContent = file.name;
        }
  
        filesContainer.appendChild(fileSquare);
      });
    });
  });
  