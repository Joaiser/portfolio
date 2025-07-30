document.addEventListener("DOMContentLoaded", function () {
    let menuToggle = document.querySelector(".tablet-navbar[type='checkbox']");
    let nav = document.querySelector(".tablet-navbar nav");

    // Asegúrate de que el menú esté oculto al cargar la página
    nav.style.display = "none";

    // Cierra/Abre el menú al hacer clic en el botón del menú
    menuToggle.addEventListener("click", function () {
        if (menuToggle.checked) {
            nav.style.display = "flex";
        } else {
            nav.style.display = "none";
        }
    });

    // Cierra el menú al hacer clic en un enlace
    let navLinks = document.querySelectorAll(".tablet-navbar nav a");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            menuToggle.checked = false;
            nav.style.display = "none";
        });
    });

    // Ajusta la posición del menú desplegado al hacer scroll
    window.addEventListener('scroll', function () {
        if (menuToggle.checked) {
            var scrollTop = window.scrollY || window.pageYOffset;

            if (scrollTop > 0) {
                nav.style.top = scrollTop + 'px';
            } else {
                nav.style.top = '0';
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const testimonialList = document.querySelector('#testimonialList');
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');

    let currentPosition = 0;

    prevBtn.addEventListener('click', function () {
        if (currentPosition === 100) {
            currentPosition = 0;
        }
        updateCarousel();
    });

    nextBtn.addEventListener('click', function () {
        if (currentPosition === 0) {
            currentPosition = 100;
        } 
        updateCarousel();
    });

    function updateCarousel() {
        testimonialList.style.transform = `translateX(-${currentPosition}%)`;
    }
});

