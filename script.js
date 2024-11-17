const accessKey = 'cWf_JoAZvGfTADkpuwN0pP24r9SozP8kwvPBZVkBNxU'; // Replace with your Unsplash API key

$(document).ready(function () {
    const gallery = $('#gallery');
    const searchInput = $('#searchInput');
    const searchButton = $('#searchButton');

    // Fetch wallpapers from Unsplash
    function fetchWallpapers(query = 'nature') {
        const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=12`;

        $.get(url, (data) => {
            gallery.empty(); // Clear previous wallpapers

            if (data.results.length === 0) {
                gallery.append('<p>No results found. Try another search.</p>');
                return;
            }

            data.results.forEach((photo) => {
                const imgElement = `
                    <div class="wallpaper">
                        <img src="${photo.urls.regular}" alt="${photo.alt_description}">
                        <a href="${photo.urls.full}" download="Wallpaper-${photo.id}.jpg" class="download-btn">Download</a>
                    </div>
                `;
                gallery.append(imgElement);
            });
        }).fail(() => {
            alert('Failed to fetch wallpapers. Please check your API key or try again later.');
        });
    }

    // Default wallpapers
    fetchWallpapers();

    // Search functionality
    searchButton.click(() => {
        const query = searchInput.val().trim();
        if (query) fetchWallpapers(query);
    });
});
