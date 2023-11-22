
document.addEventListener('DOMContentLoaded', () => { // this eventlistener waits till the html document is completely loaded

    const urlWorks = 'http://localhost:5678/api/works'
    const urlCategories = 'http://localhost:5678/api/categories'

// works section
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

            // categories section
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
        const allImages = document.querySelectorAll('#portfolio .gallery img');

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
