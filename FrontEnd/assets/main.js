
document.addEventListener('DOMContentLoaded', () => { // this eventlistener waits till the html document is completely loaded

    const isLoggedIn = sessionStorage.getItem('token');
    const loginLink = document.querySelector('a[href="./assets/login_page.html"]');


    if (isLoggedIn) {  // if login is successful the user will be redirected to "edit mode" index.html
        loginLink.textContent = 'logout';
        document.querySelector('.edit').style.display = 'flex';
        document.querySelector('.modifier-text').style.display = 'flex';
        document.querySelector('.buttons-container').style.display = 'none';

        // code for first modal
        const modal = document.querySelector('.modal');
        const openModal = document.querySelector('.modifier-text');
        const closeModal = document.querySelector('.fa-xmark');
        const modalOverlay = document.querySelector('.modal-overlay');

        loginLink.addEventListener('click', (event) => {
            event.preventDefault();
            sessionStorage.removeItem('token');
            window.location.href = 'index.html';
        });

        openModal.addEventListener('click', () => {
            modal.style.display = 'block';
            modalOverlay.style.display = 'block';
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            modalOverlay.style.display = 'none';
        });

        modalOverlay.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
            modal.style.display = 'none';
        });
        // end code for first modal

        // second modal (add works)
            const changeModal = document.querySelector('.add-picture');
            const addPhoto = document.querySelector('.modal-title');

        if (changeModal) {
            changeModal.addEventListener('click', () => {
                addPhoto.textContent = 'Ajout photo';
            });
        }
        // end second modal (add works)

        // structure of modal content
        const urlWorks = 'http://localhost:5678/api/works'
        fetch(urlWorks)
        .then(response => response.json())    
        .then(works => {
            function displayWorksModal(works) {
                const modalGallery = document.querySelector('#modal .modalGallery');

                for (let i = 0; i < works.length; i++) {
                    const arrayWork = works[i]

                    const modalContent = document.createElement('figure');
                    const img = document.createElement('img');
                    const figcaption = document.createElement('figcaption');
                    const trashHolder = document.createElement('div');
                    const trashIcon = document.createElement('i');

                    img.dataset.categoryId = arrayWork.categoryId; 
                    img.src = arrayWork.imageUrl;

                    modalContent.classList.add('modal-content');
                    trashHolder.classList.add('trash-holder');
                    trashIcon.classList.add('fa-solid', 'fa-trash-can');

                    modalGallery.appendChild(modalContent);
                    modalContent.appendChild(img);
                    modalContent.appendChild(figcaption);
                    modalContent.appendChild(trashHolder);
                    trashHolder.appendChild(trashIcon);
                    // removes Work
                    trashHolder.addEventListener('click', () => {
                        deleteWork(arrayWork.id);
                        modalContent.remove();
                      });
                    // end removes Work
                }
            }
            displayWorksModal(works);
        })
        .catch(error => {
            console.error('Error fetching works:', error);
          });
        // end structure of modal content
        function deleteWork(workId) {
            const token = sessionStorage.getItem('token');
            fetch(`http://localhost:5678/api/works/${workId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': 'Bearer ' + token, 
                'Content-Type': 'application/json'
              }
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Deletion failed');
                }
              })
              .catch(error => {
                console.error('Deletion error:', error);
              });
          }
        } else {
    }

    const urlWorks = 'http://localhost:5678/api/works'
    const urlCategories = 'http://localhost:5678/api/categories'

    // WORKS SECTION
    fetch(urlWorks) // fetch method makes a request to the url and returns a promise
        .then(response => response.json())     // handles the response from fetch operation. Once the data is retrieved, the first .then is executed converting the response to .json format using response.json()
        .then(works => { // second .then handles the json data received from server. The works variable contains the parsed json data retrieved from the first .then

            function displayWorks(works) { // displayWorks function processes 'works' data received from api. It creates html elements figure, img, figcaption based on info retrieved 
                const gallery = document.querySelector('#portfolio .gallery'); // prepares reference to html eelement before iterating over works array.

                for (let i = 0; i < works.length; i++) {
                    const arrayWork = works[i]

                    const figure = document.createElement('figure');
                    const img = document.createElement('img');
                    const figcaption = document.createElement('figcaption');

                    img.dataset.categoryId = arrayWork.categoryId; // .dataset property in js provides access to custom data of an html element
                    img.src = arrayWork.imageUrl;
                    figcaption.textContent = arrayWork.title;

                    gallery.appendChild(figure);
                    figure.appendChild(img);
                    figure.appendChild(figcaption);
                };
            }
            displayWorks(works);

            // CATEGORIES SECTION
            fetch(urlCategories)
                .then(response => response.json())
                .then(categories => {
                    const filterButtons = document.querySelector('.buttons-container');

                    const allCategoriesButton = document.createElement('button');
                    allCategoriesButton.textContent = 'Tous'; // button Tous to show all categories
                    allCategoriesButton.dataset.categoryId = 'all';
                    allCategoriesButton.addEventListener('click', () => {
                        categoryFilter('all');
                    });
                    filterButtons.appendChild(allCategoriesButton);

                    for (let i = 0; i < categories.length; i++) {
                        const arrayCategory = categories[i]

                        const button = document.createElement('button');
                        button.textContent = arrayCategory.name;
                        button.dataset.categoryId = arrayCategory.id;
                        button.addEventListener('click', () => {
                            categoryFilter(arrayCategory.id);
                        });
                        filterButtons.appendChild(button);
                    };
                })
                .catch(error => {  // error handling for categories section
                    console.error('Something went wrong with filtres:', error);
                });
        })
        .catch(error => { // error handling for works section
            console.error('Something went wrong with works:', error);
        });

    function categoryFilter(categoryId) {
        const allButtons = document.querySelectorAll('.buttons-container button');
        const allImages = document.querySelectorAll('#portfolio .gallery img');

        allButtons.forEach(button => {
            button.classList.remove('selected');
        });

        event.target.classList.add('selected');

        for (i = 0; i < allImages.length; i++) {
            const img = allImages[i]

            if (categoryId === 'all' || img.dataset.categoryId === categoryId.toString()) {
                img.parentNode.style.display = 'block'; // Show images of the selected category or all images
            } else {
                img.parentNode.style.display = 'none'; // Hide images not matching the category
            }
        };
    }
});


