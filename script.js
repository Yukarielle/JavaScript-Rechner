
function calculateChange(zuZahlen, bezahlt) {
    console.log(typeof(document.getElementById("zuZahlen").value));
    if (bezahlt < zuZahlen) {
        return "Dein bezahlter Betrag reicht nicht!";
    }

    let change = (bezahlt - zuZahlen)*100;

    const waehrung = [
        { value: 50000, type: '€ Scheine' },
        { value: 20000, type: '€ Scheine' },
        { value: 10000, type: '€ Scheine' },
        { value: 5000, type: '€ Scheine' },
        { value: 2000, type: '€ Scheine' },
        { value: 1000, type: '€ Scheine' },
        { value: 500, type: '€ Scheine' },
        { value: 200, type: '€ Münzen' },
        { value: 100, type: '€ Münzen' },
        { value: 50, type: '€ Münzen' },
        { value: 20, type: '€ Münzen' },
        { value: 10, type: '€ Münzen' },
        { value: 5, type: '€ Münzen' },
        { value: 2, type: '€ Münzen' },
        { value: 1, type: '€ Münzen' }
    ];

    let result = {};

    waehrung.forEach(waehrung => {

        let count = Math.floor(change / waehrung.value); //Überprüfen wie oft Schein/Münze in Wechselgeld passt

        if (count > 0) {
            result[waehrung.value + ' ' + waehrung.type] = count; //Gibt die Reihenfolge des Strings vor...
            change = (change - count * waehrung.value); //Schein vom Wechselgeld abgezogen...Schleife nächste Position
        }
    });

    return result;
}

function displayChange() {
    const zuZahlen = parseFloat(document.getElementById('zuZahlen').value);
    const bezahlt = parseFloat(document.getElementById('bezahlt').value);

    if (isNaN(zuZahlen) || isNaN(bezahlt)) { //Abfangen wenn Eingabe keine Nummer... geht zwar nicht durch HTML input type="number" aber egal
        document.getElementById('result').innerHTML = "Ungültiger Betrag.";
        return;
    }

    const change = calculateChange(zuZahlen, bezahlt);
   
        let resultHTML = '<h3>Rückgeld:</h3><ul>'; //Liste öffnen vor for
        for (const [waehrung, count] of Object.entries(change)) {
            
        var hilfsfloat = parseFloat(waehrung);
           if (hilfsfloat < 100)
            {
                resultHTML += `<li>${count} x ${hilfsfloat} Cent Münze</li>`;
            }
            if (hilfsfloat >= 100 && hilfsfloat < 499)
                {
                    resultHTML += `<li>${count} x ${hilfsfloat / 100} Euro Münze </li>`;
                }
                if (hilfsfloat >=500)
                    {
                        resultHTML += `<li>${count} x ${hilfsfloat / 100} Euro Schein </li>`;
                    }
           
        }
        resultHTML += '</ul>'; //Liste schließen nach for
        document.getElementById('result').innerHTML = resultHTML; //Ausgabe in HTML
    
}
 