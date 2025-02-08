document.addEventListener('DOMContentLoaded', () => {
    const outerHeader = document.querySelector('.outer-header');
    const outerContent = document.querySelector('.outer-content');
    const formHeader = document.querySelector('.form-header');
    const formContent = document.querySelector('.form-content');
    const calculateButton = document.getElementById('calculateButton');
    const resultsTable = document.getElementById('resultsTable');

    // Toggle outer container
    outerHeader.addEventListener('click', () => {
        outerContent.classList.toggle('hidden');
    });

    // Toggle form section
    formHeader.addEventListener('click', () => {
        formContent.classList.toggle('hidden');
    });

    // Calculation logic
    calculateButton.addEventListener('click', () => {
        const antalPersoner = parseInt(document.getElementById('antalPersoner').value, 10);
        const fastighetsPris = parseFloat(document.getElementById('fastighetsPris').value);
        const belaningsgrad = parseFloat(document.getElementById('belaningsgrad').value) / 100;
        const ranta = parseFloat(document.getElementById('ranta').value) / 100;
        const pantbrev = parseFloat(document.getElementById('pantbrev').value);

        const kontantinsats = fastighetsPris * (1 - belaningsgrad);
        const lanatKapital = fastighetsPris - kontantinsats;
        const rantekostnadManad = (lanatKapital * ranta) / 12;

        resultsTable.innerHTML = `
            <tr><td>Kontantinsats</td><td>${kontantinsats.toFixed(2)} kr</td><td>${(kontantinsats / antalPersoner).toFixed(2)} kr</td></tr>
            <tr><td>Lånat kapital bank</td><td>${lanatKapital.toFixed(2)} kr</td><td>${(lanatKapital / antalPersoner).toFixed(2)} kr</td></tr>
            <tr><td>Räntekostnad / mån</td><td>${rantekostnadManad.toFixed(2)} kr</td><td>${(rantekostnadManad / antalPersoner).toFixed(2)} kr</td></tr>
        `;
    });
});
