// Denna fil innehåller TypeScript‑modeller (interface och typer) som beskriver hur en budgetpost och listan av budgetposter ska se ut. 
// Syfte är att typescript kommer varna om man råkar glömma en egenskap, eller som man skriver fel typ ex amount som string.

export interface BudgetItem {
    description: string;
    amount: number;
    category: string;
    type: 'income' | 'expense';
}

// Typ som representerar en lista av budgetposter. Används för att typa budgetList‑arrayen i huvudfilen.
export type BudgetList = BudgetItem[];

