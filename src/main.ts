// @ts-nocheck
import './sass/style.scss';

// Tom array som ska innehålla alla inkomster och utgifter, varje gång användaren sparar något skapas ett objekt som läggs här i listan.
const budgetList = [];

// ----------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------- Hämta from DOMEN --------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Inputfält inkomst
const incomeDescription = document.querySelector('#incomeDescription'); // inputfält med en beskrivning av inkomsten
const incomeAmount = document.querySelector('#incomeAmount'); // inputfält med belopp
const incomeCategory = document.querySelector('#incomeCategory'); // inputfält med kategori för inkomsten

// Inputfält expenses
const expenseDescription = document.querySelector('#expenseDescription'); // inputfält med en beskrivning av utgifter
const expenseAmount = document.querySelector('#expenseAmount'); // inputfält med belopp
const expenseCategory = document.querySelector('#expenseCategory'); // inputfält med kategori för inkomsten

// Där budgetposterna ska skrivas ut
const listContainer = document.querySelector('#listContainer'); // Hämta själva list containern där innehållet från inkomst/utgifter ska skrivas ut

// Formulär hämtas för att kunna göra en reset formuläret efter klick på spara inkomst/utgift
const incomeForm = document.querySelector('#incomeForm');
const expenseForm = document.querySelector('#expenseForm');
// ----------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------- Hämta knapparna ---------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Hämta knapparna som ska lägga till inkomster och utgifter
const saveIncomeBtn = document.querySelector('#saveIncomeBtn');
const saveExpenseBtn = document.querySelector('#saveExpenseBtn');

// ----------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------- Lägger till eventlisteners ---------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Lägger ett event vid klick av lägg till inkomst eller utgifter
saveIncomeBtn.addEventListener('click', handleIncome); // Knappen kommer spara en inkomst
saveExpenseBtn.addEventListener('click', handleExpense); // Knappen kommer spara en utgift

// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------- Funktion som tar hand om inkomster -----------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
function handleIncome() {
  // Validera alla fält först. Om något fält är ogiltigt ska funktionen stoppas direkt.
  // På så sätt slipper vi hämta värden eller skapa objekt i onödan när input ändå inte är giltig.
  const valid = validateField(incomeDescription) && validateField(incomeAmount) && validateField(incomeCategory);

  if (!valid) {
    return;
  } // Om något fält är ogiltigt, avbryt funktionen

  // Hämta värderna som användaren har fyllt i i inputfälten, dessa är strängar från DOM:en
  const descriptionValue = incomeDescription.value;
  const amountValue = incomeAmount.value;
  const categoryValue = incomeCategory.value;

  // Skapa ett objekt som representerar en inkomst
  // Samma princip som i förra uppgiften fast där hårdkodades varje medans här styrs det av vad användaren lägger in inputfältet
  const incomeObject = {
    description: descriptionValue, // Beskrivning av inkomsten
    amount: Number(amountValue), // Summan, omvandlat från sträng till ett nummer
    category: categoryValue, // Kategorin som användare valt
    type: 'income', // Typen så jag kan skilja inkomster mot utgifter
  };

  // Lägg till objektet i budgetlistan
  // Arrayn kommer växa för varje gång användaren sparar en inkomst
  budgetList.push(incomeObject);

  renderList(); // Anropas för att uppdatera det som visas i DOM. När vi sparar en inkomst/utgift ändras bara arrayen (budgetList) och DOM uppdateras inte automatiskt
  incomeForm.reset(); // Tömmer inputfälten efter man har sparat inkomsten
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ Funktion som tar hand om utgifter -----------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

function handleExpense() {
  // Validera alla fält först. Om något fält är ogiltigt ska funktionen stoppas direkt.
  // På så sätt slipper vi hämta värden eller skapa objekt i onödan när input ändå inte är giltig.
  const valid = validateField(expenseDescription) && validateField(expenseAmount) && validateField(expenseCategory);

  if (!valid) {
    return;
  } // Om något fält är ogiltigt, avbryt funktionen

  // Hämta värderna som användaren har fyllt i i inputfälten, dessa är strängar från DOM:en
  const descriptionValue = expenseDescription.value;
  const amountValue = expenseAmount.value;
  const categoryValue = expenseCategory.value;

  // Upprepande som förra funktionen
  // Skapa ett objekt som representerar en utgift

  const expenseObject = {
    description: descriptionValue, // Beskrivning av inkomsten
    amount: Number(amountValue), // Summan, omvandlat från sträng till ett nummer
    category: categoryValue, // Kategorin som användare valt
    type: 'expense', // Typen så jag kan skilja inkomster mot utgifter
  };

  // Lägg till objektet i budgetlistan
  // Arrayn kommer växa för varje gång användaren sparar en utgift
  budgetList.push(expenseObject);

  renderList(); // Anropas för att uppdatera det som visas i DOM. När vi sparar en inkomst/utgift ändras bara arrayen (budgetList) och DOM uppdateras inte automatiskt
  expenseForm.reset(); // Tömmer inputfälten efter man har sparat utgiften
}

// ----------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------- Funktion som renderar budgetposter i DOM  -------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Funktionen ska visa alla sparade budgetposter (inkomster och utgifter) i DOM:en
function renderList() {
  listContainer.innerHTML = ''; // Tömmer listan i DOM så att den kan byggas upp på nytt

  for (let i = 0; i < budgetList.length; i++) {
    // Loopar igenom alla sparade budgetposter i arrayen
    const item = budgetList[i]; // Hämtar det aktuella objektet (inkomst eller utgift) från arrayen baserat på loopens index

    // Lägger till en visuell rad i listan för den aktuella budgetposten
    listContainer.innerHTML += `
            <article class="${item.type}">
                <span>${item.description}</span>
                <span>${item.amount} kr</span>
                <span>${item.category}</span>
                <button data-index="${i}" class="delete-btn">Radera</button>
            </article>
        `;
  }
  // Delete knappen måste ligga innanför renderlist funktionen eftersom eventet ska skapas efter knapparna har skapats
  const deleteButton = document.querySelectorAll('button.delete-btn');
  deleteButton.forEach((btn) => {
    btn.addEventListener('click', deleteBudgetPost);
  });
}

// ----------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------- Delete funktion  -------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Funktionen hämtar index från knappen deleteBtn, tar bort rätt objekt ur arrayen och uppdaterar DOMEN
function deleteBudgetPost(e) {
  const index = Number(e.target.dataset.index); // Hämtar index från knappen

  budgetList.splice(index, 1); // Tar bort rätt objekt i arrayen

  renderList(); // Uppdaterar DOMEN
}

// ----------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------- Delete funktion  -------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

function validateField(field) {
  const value = field.value.trim(); // Tomt fält → fel

  if (value === '') {
    field.classList.add('error');

    return false;
  } // Om det är ett number-fält → kontrollera att det är ett giltigt nummer

  if (field.type === 'number' && (isNaN(Number(value)) || Number(value) <= 0)) {
    field.classList.add('error');

    return false;
  } // Annars OK

  field.classList.remove('error');

  return true;
}
