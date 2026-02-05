# Psuedokod till uppgiften, bryta ned i mindre delar

Skriver efter html strukturen

## Inkomster

- Ett fält för att mata in en INKOMST (belopp och beskrivning)

1. Först hämta värdet på inputfältet för beskrivning, sedan för summa och select-fältet.
2. Därefter behöver man skapa ett objekt som innehåller dessa delar, description, amount,category och type.
3. Lägga till objektet i den tomma arrayn som ska hålla alla inkomster och utgifter.

## Utgifter

- Ett fält för att mata in en UTGIFT (belopp och beskrivning)

1. Först hämta värdet på inputfältet för beskrivning, sedan för summa och select-fältet.
2. Därefter behöver man skapa ett objekt som innehåller dessa delar, description, amount,category och type.
3. Lägga till objektet i den tomma arrayn som ska hålla alla inkomster och utgifter.

## Budgetpost

- Bredvid varje budgetpost ska det finnas en radera-knapp
- Till varje budgetpost ska det gå att välja en kategori från en dropdown-lista (select)

1. När en inkomst eller utgift sparas ska den visas i en lista på sidan
2. Loopa igenom arrayen och skapa en visuell post i DOM för varje objekt med beskrivninv, belopp, kategori, typ(inkomst/utgift) och en radera knapp
3. Varje post ska också ha en dropdown‑lista (select) där användaren kan ändra kategori
4. När en kategori ändras eller en post raderas ska det loopas igenom arrayen igen så det uppdateras igen

## Balans

- Det ska visas en balans (inkomster minus utgifter)
- Balansens ska färgkodas beroende på om det är ett positivt eller negativt värde
- Balansen ska uppdateras varje gång en ny utgift eller inkomst matas in

1. Balansen ska räknas ut genom att ta totalinkomsten minus utgifter
2. Balansen ska färgkodas att att positivt=grönt och negativt=rött
3. Balansen ska uppdateras varje gång användaren lägger till eller tar bort en inkomst/utgift

## Local storage

- Informationen ska sparas i local storage så att när användaren kommer till sidan nästa gång, så ska informationen finnas kvar.

- Kategorierna ska läsas in via JSON. Vi går igenom detta på lektionen.
