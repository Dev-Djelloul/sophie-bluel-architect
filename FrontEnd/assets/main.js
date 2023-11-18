
document.addEventListener('DOMContentLoaded', () => {
    let fetchedWorks;

    const urlWorks = 'http://localhost:5678/api/works'
    const urlCategories = 'http://localhost:5678/api/categories'

    fetch(urlWorks) // the fetch method returns something called a promise
        .then(response => response.json())
        .then(works => {
            fetchedWorks = works;

            function displayWorks(works) {
                const gallery = document.querySelector('#portfolio .gallery');
                gallery.innerHTML = ''; // clears existing content

                works.forEach(work => {
                    const figure = document.createElement('figure');
                    const img = document.createElement('img');
                    const figcaption = document.createElement('figcaption');

                    img.src = work.imageUrl;
                    img.alt = work.title;
                    img.dataset.categoryId = work.categoryId; 
                    figcaption.textContent = work.title;

                    figure.appendChild(img);
                    figure.appendChild(figcaption);

                    gallery.appendChild(figure);
                });
            }

            displayWorks(works);


            fetch(urlCategories)
                .then(response => response.json())
                .then(categories => {
                    const buttonsContainer = document.createElement('div');
                    buttonsContainer.id = 'buttonsContainer';

                    const tousButton = document.createElement('button');
                    tousButton.textContent = 'Tous'; // button to show all categories
                    tousButton.dataset.categoryId = 'all';
                    tousButton.addEventListener('click', () => {
                        filterWorksByCategory('all');
                    });
                    buttonsContainer.appendChild(tousButton);

                    categories.forEach(category => {
                        const button = document.createElement('button');
                        button.textContent = category.name;
                        button.dataset.categoryId = category.id;
                        button.addEventListener('click', () => {
                            filterWorksByCategory(category.id);
                        });

                        buttonsContainer.appendChild(button);
                    });

                    document.querySelector('.project-title').appendChild(buttonsContainer);
                })
                .catch(error => {
                    console.error('Something went wrong with filtres:', error);
                });

        })
        .catch(error => {
            console.error('Something went wrong with works:', error);
        });

        function filterWorksByCategory(categoryId) {
            const allImages = document.querySelectorAll('#portfolio .gallery img');
    
            allImages.forEach(img => {
                if (categoryId === 'all' || img.dataset.categoryId === categoryId.toString()) {
                    img.parentNode.style.display = 'block'; // Show images of the selected category or all images
                } else {
                    img.parentNode.style.display = 'none'; // Hide images not matching the category
                }
        });
    }
});
