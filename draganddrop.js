const dropArea = document.getElementById('drop-area');
const imageContainer = document.getElementById('image-container');
const fileInput = document.getElementById('fileInput');
const errorMessage = document.getElementById('error-message');
const errorFileName = document.getElementById('error-file-name');
const confirmButton = document.getElementById('confirm-button');

dropArea.addEventListener('dragover', (e) => { // dragover" gdy użytkownik przesuwa myszką nad obszarem docelowym
    e.preventDefault(); //zapobiega domyślnemu zachowaniu przeglądarki
    dropArea.style.border = '2px dashed #000';
    hideErrorMessage();
});

dropArea.addEventListener('dragleave', () => { // gdy opuszcza obszar
    dropArea.style.border = '2px dashed #ccc';
});

dropArea.addEventListener('drop', (e) => { // "drop" (upuszczenie plików) 
    e.preventDefault();
    dropArea.style.border = '2px dashed #ccc';

    const files = e.dataTransfer.files; //pobiera listę przeciągniętych i upuszczonych plików z obiektu zdarzenia e. Pliki te są przechowywane w e.dataTransfer.files.
    handleFiles(files); //przekazuje pobrane pliki do funkcji handleFiles, która jest odpowiedzialna za przetwarzanie i wyświetlanie miniatur obrazów z tych plików na stronie.
});

fileInput.addEventListener('change', (e) => { // kliknięcie przycisku "Wybierz pliki", zdarzenie change jest wywoływane na elemencie fileInput.
    const files = e.target.files; // uzyskać dostęp do listy wybranych plików
    handleFiles(files);
});

dropArea.addEventListener('click', () => {
    fileInput.click(); //  to ukryty element input typu file, który umożliwia wybór plików z komputera 
});

function handleFiles(files) {
    for (const file of files) {
        if (file.type.startsWith('image/')) { //Funkcja file.type zwraca typ MIME pliku, a startsWith('image/') sprawdza, czy ten typ MIME rozpoczyna się od ciągu znaków "image/". 
            const thumbnailContainer = document.createElement('div');
            thumbnailContainer.classList.add('thumbnail-container');

            const thumbnail = document.createElement('img');
            thumbnail.classList.add('thumbnail');
            thumbnail.src = URL.createObjectURL(file);

            //const deleteButton = document.createElement('span');
            //deleteButton.classList.add('delete-button');

            const deleteButton = document.createElement('span');
            deleteButton.classList.add('delete-button');

            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const confirmDeletion = confirm('Czy na pewno chcesz usunąć tę miniaturę?');
                    if (confirmDeletion) {
                        imageContainer.removeChild(thumbnailContainer);
                    }
            });

            
            //deleteButton.addEventListener('click', (e) => {
             //   e.stopPropagation(); 
            //    imageContainer.removeChild(thumbnailContainer);
           // });

            thumbnailContainer.appendChild(thumbnail);
            thumbnailContainer.appendChild(deleteButton);

            imageContainer.appendChild(thumbnailContainer);
        } else {
            displayErrorMessage(file.name);
        }
    }
}

function displayErrorMessage(fileName) {
    errorMessage.style.display = 'block';
    errorFileName.textContent = fileName;
    confirmButton.style.display = 'block';
    confirmButton.addEventListener('click', hideErrorMessage);
}

function hideErrorMessage() {
    errorMessage.style.display = 'none';
    errorFileName.textContent = '';
    confirmButton.style.display = 'none';
}