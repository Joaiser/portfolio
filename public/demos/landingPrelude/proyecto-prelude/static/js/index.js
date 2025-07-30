document.addEventListener('DOMContentLoaded', (event) => {
    let pointsContainerGreen = document.getElementById('points-container-green');
    let pointsContainerBlue = document.getElementById('points-container-blue');

    for (let i = 1; i <= 21; i++) {
        let pointGreen = document.createElement('span');
        let pointBlue = document.createElement('span');
        pointGreen.classList.add('points');
        pointBlue.classList.add('points');
        if (i === 11) {
            pointGreen.classList.add('larger');
            pointBlue.classList.add('larger');
        }
        pointsContainerGreen.appendChild(pointGreen);
        pointsContainerBlue.appendChild(pointBlue);
    }
});