// @ts-nocheck
import './sass/style.scss';

// Tom array som ska innehålla alla inkomster och utgifter, varje gång användaren sparar något skapas ett objekt som läggs här i listan.
let budgetList = [];

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

// Hämtar elementet som ska visa den aktuella balansen. Det ska uppdateras varje gång listan ändras.
const balanceValue = document.querySelector('#balanceValue');

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
  saveToLocalStorage();
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
  saveToLocalStorage(); // Spara till localstorage
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

  calculateBalance();
}

// ----------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------- Delete funktion  -------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Funktionen hämtar index från knappen deleteBtn, tar bort rätt objekt ur arrayen och uppdaterar DOMEN
function deleteBudgetPost(e) {
  const index = Number(e.target.dataset.index); // Hämtar index från knappen

  budgetList.splice(index, 1); // Tar bort rätt objekt i arrayen
  saveToLocalStorage(); // Spara till localstorage
  renderList(); // Uppdaterar DOMEN
}

// ----------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------- Validera fälten  -------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Syfte är att validera inkomster/utgifter så att man inte kan lägga till tomma budgetposter
// Samt att man inte ska kunna lägga till negativa budgetposter
function validateField(field) {
  const value = field.value.trim(); // Hämtar fältets värde och tar bort onödiga mellanslag i början/slutet.

  if (value === '') { // Kontrollera om fältet är tomt
    field.classList.add('error'); // Markera fältet som ogiltigt

    return false;
  }

  if (field.type === 'number' && (isNaN(Number(value)) || Number(value) <= 0)) { // Om det är ett number-fältkontrollera att det är ett giltigt nummer större än 0
    field.classList.add('error');

    return false;
  }

  field.classList.remove('error'); // Om allt är okej, ta bort felmarkeringen

  return true;
}

// ----------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------- Funktion balans --------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Ska räkna ut balansen/summan av inkomster och utgifter, se om det ger ett positivt/negativt resultat
// Beroende på det ska det bli grönt för positivt och rött för negativt
function calculateBalance() {
  // Variabler som ska summeras behöver vara let eftersom värdet ska ändras i loopen
  let totalIncome = 0;
  let totalExpense = 0;

  for (let i = 0; i < budgetList.length; i++) { // Loppar igenom alla objekt i budgetlistan
    const item = budgetList[i]; // Hämta det aktuella objektet (inkomst/utgift)

    if (item.type === 'income') { // Om det är en inkomst, lägg till beloppet i totalincome
      totalIncome += item.amount;
    } else if (item.type === 'expense') { // Om det är en utgift, lägg till beloppet i totalexpense
      totalExpense += item.amount;
    }
  }

  const balance = totalIncome - totalExpense; // Räkna ut balansen inkomster minus utgifter

  balanceValue.textContent = `Totalt: ${balance} kr`; // Skriv ut balansen i DOM

  // Färgkoda resultatet beroende på om det är positivt eller negativt
  if (balance > 0) { // Om balance är likamed eller större än 0
    balanceValue.classList.add('positive'); // Läggs CSS class positive
    balanceValue.classList.remove('negative'); // Medans den negativa tas bort
  } else if (balance < 0) { // Om balance är mindre än 0
    balanceValue.classList.add('negative'); // Lägg till CSS class negative
    balanceValue.classList.remove('positive'); // Ta bort positiva
  } else { // Om det är likamed 0 ta bort båda klasserna
    balanceValue.classList.remove('positive');
    balanceValue.classList.remove('negative');
  }
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------- Funktion spara till LocalStorage -------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Sparar hela budgetList-arrayen i localStorage som en JSON-sträng
// JSON.stringify omvandlar arrayen till text eftersom localStorage bara kan lagra strängar
function saveToLocalStorage() {
  localStorage.setItem('budgetList', JSON.stringify(budgetList));
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ Funktion läsa från LocalStorage -------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Läser in sparad data från localStorage när sidan laddas
// Om det finns sparad data ersätter vi hela budgetList med den sparade arrayen
// Detta är samma princip som lärarens exempel
function loadFromLocalStorage() {
  const saved = localStorage.getItem('budgetList'); // Hämtar strängen från localStorage
  if (saved) {
    budgetList = JSON.parse(saved); // Ersätter hela arrayen med den sparade
  }
}
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------- Ladda data vid sidstart ----------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
loadFromLocalStorage(); // När sidan laddas ska vi först läsa in eventuell sparad data
renderList(); // Sedan renderar vi listan så att allt visas direkt i DOM