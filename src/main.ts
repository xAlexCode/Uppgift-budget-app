// @ts-nocheck
import './sass/style.scss';

// Tom array som ska innehålla alla inkomster och utgifter, varje gång användaren sparar något skapas ett objekt som läggs här i listan.
let budgetList = [];

// ----------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- Hämta inputfälten from DOMEN --------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
//Inputfält inkomst
const incomeDescription = document.querySelector('#incomeDescription'); //inputfält med en beskrivning av inkomsten
const incomeAmount = document.querySelector('#incomeAmount'); //inputfält med summan
const incomeCategory = document.querySelector('#incomeCategory'); // inputfält med kategori för inkomsten

//Inputfält expenses
const expenseDescription = document.querySelector('#expenseDescription');//inputfält med en beskrivning av utgifter
const expenseAmount = document.querySelector('#expenseAmount'); //inputfält med summan
const expenseCategory = document.querySelector('#expenseCategory'); // inputfält med kategori för inkomsten

//Där budgetposterna ska skrivas ut
const listContainer = document.querySelector('#listContainer'); // Hämta själva list containern där innehållet från inkomst/utgifter ska skrivas ut
// ----------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------- Hämta knapparna ---------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
//Hämta knapparna som ska lägga till inkomster och utgifter
const saveIncomeBtn = document.querySelector('#saveIncomeBtn');
const saveExpenseBtn = document.querySelector('#saveExpenseBtn');

// ----------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------- Lägger till eventlisteners ---------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
//Lägger ett event vid klick av lägg till inkomst eller utgifter
saveIncomeBtn.addEventListener('click', handleIncome); // Knappen kommer spara en inkomst
saveExpenseBtn.addEventListener('click', handleExpense);// Knappen kommer spara en utgift

// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------- Funktion som tar hand om inkomster -----------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
function handleIncome() {
    // Hämta värderna som användaren har fyllt i i inputfälten, dessa är strängar från DOM:en
    const descriptionValue = incomeDescription.value;
    const amountValue = incomeAmount.value;
    const categoryValue = incomeCategory.value;
    
    //Skapa ett objekt som representerar en inkomst
    //Samma princip som i förra uppgiften fast där hårdkodades varje medans här styrs det av vad användaren lägger in inputfältet 
 
    const incomeObject = {  
        description: descriptionValue, // Beskrivning av inkomsten
        amount: Number(amountValue), // Summan, omvandlat från sträng till ett nummer
        category: categoryValue, // Kategorin som användare valt
        type: "income" // Typen så jag kan skilja inkomster mot utgifter
    };

    //Lägg till objektet i budgetlistan
    // Arrayn kommer växa för varje gång användaren sparar en inkomst
    budgetList.push(incomeObject);

    renderList(); //Anropas för att uppdatera det som visas i DOM. När vi sparar en inkomst/utgift ändras bara arrayen (budgetList) och DOM uppdateras inte automatiskt
    //console.log(budgetList); //Logga arrayen så allt funkar och objektet läggs till 
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ Funktion som tar hand om utgifter -----------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

function handleExpense() {
    // Hämta värderna som användaren har fyllt i i inputfälten, dessa är strängar från DOM:en
    const descriptionValue = expenseDescription.value;
    const amountValue = expenseAmount.value;
    const categoryValue = expenseCategory.value;

    //Upprepande som förra funktionen 
    //Skapa ett objekt som representerar en utgift

    const expenseObject = {
        description: descriptionValue, // Beskrivning av inkomsten
        amount: Number(amountValue), // Summan, omvandlat från sträng till ett nummer
        category: categoryValue, // Kategorin som användare valt
        type: "expense" // Typen så jag kan skilja inkomster mot utgifter
    };

     //Lägg till objektet i budgetlistan
    // Arrayn kommer växa för varje gång användaren sparar en utgift
    budgetList.push(expenseObject);

    renderList(); //Anropas för att uppdatera det som visas i DOM. När vi sparar en inkomst/utgift ändras bara arrayen (budgetList) och DOM uppdateras inte automatiskt
    //console.log(budgetList); //Logga arrayen så allt funkar och objektet läggs till 
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ Funktion som skapar  -----------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Funktionen ska visa alla sparade budgetposter (inkomster och utgifter) i DOM:en
function renderList() {
    listContainer.innerHTML = ''; // Tömmer listan i DOM så att den kan byggas upp på nytt

    for(let i = 0; i < budgetList.length; i++) { // Loopar igenom alla sparade budgetposter i arrayen
        const item = budgetList[i] 

        // Lägger till en visuell rad i listan för den aktuella budgetposten
        listContainer.innerHTML += `
            <article class="${item.type}">
                <span>${item.description}</span>
                <span>${item.amount} kr</span>
                <span>${item.category}</span>
                <button data-index="${i}" class="delete-btn">Radera</button>
            </article>
        `
    }
}