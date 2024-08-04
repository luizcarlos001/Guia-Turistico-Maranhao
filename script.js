function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "/img/menu_white_36dp.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "/img/close_white_36dp.svg";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split("/").pop();


    function setActiveNavItem() {
        const isMobile = window.innerWidth <= 730;

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');

            if (!isMobile && linkPath === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveNavItem();

    window.addEventListener('resize', setActiveNavItem);
});

var map = L.map('map').setView([-2.5489, -44.6367], 8); 
    
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var lugares = [
    {
        name: 'São Luís',
        coords: [-2.5294, -44.3028],
        description: 'Capital do Maranhão.'
    },
    {
        name: 'Lençóis Maranhenses',
        coords: [-2.5438, -43.1248],
        description: 'Parque Nacional com dunas e lagoas.'
    },
    {
        name: 'Alcântara',
        coords: [-2.39763, -44.4045],
        description: 'Cidade histórica com arquitetura colonial.'
    }
];

lugares.forEach(function(lugar) {
    L.marker(lugar.coords).addTo(map)
        .bindPopup('<b>' + lugar.name + '</b><br>' + lugar.description)
        .openPopup();
});

const options = document.querySelectorAll('.option');
const selectedDestination = document.getElementById('selected-destination');
const mapContainer = document.getElementById('map');
const descriptionContainer = document.getElementById('description');
options.forEach(option => {
    option.addEventListener('click', () => {
        const destination = option.getAttribute('data-destination');
        const mapUrl = option.getAttribute('data-map-url');
        const description = option.getAttribute('data-description');
        selectedDestination.textContent = `Selected Destination: ${destination}`;
        mapContainer.innerHTML = `<iframe src="${mapUrl}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
        descriptionContainer.textContent = description;
    });
});
