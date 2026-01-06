import { ApolloLink, Observable } from '@apollo/client';

// Initial state from LocalStorage or defaults
const getInitialData = () => {
    const saved = localStorage.getItem('gestion_comptes_data');
    if (saved) return JSON.parse(saved);
    return {
        comptes: [
            { id: '1', solde: 1500.0, dateCreation: new Date().toISOString(), type: 'COURANT' },
            { id: '2', solde: 5000.0, dateCreation: new Date().toISOString(), type: 'EPARGNE' }
        ],
        transactions: []
    };
};

let data = getInitialData();

const saveData = () => {
    localStorage.setItem('gestion_comptes_data', JSON.stringify(data));
};

export const mockLink = new ApolloLink((operation) => {
    const { operationName, variables } = operation;

    return new Observable((observer) => {
        console.log(`[Mock Server] Executing ${operationName}`, variables);

        let resultData = {};

        try {
            switch (operationName) {
                case 'GetAllComptes':
                    resultData = { allComptes: data.comptes };
                    break;

                case 'SaveCompte':
                    const newCompte = {
                        id: Math.random().toString(36).substr(2, 9),
                        solde: variables.compte.solde,
                        type: variables.compte.type,
                        dateCreation: new Date().toISOString()
                    };
                    data.comptes.push(newCompte);
                    saveData();
                    resultData = { saveCompte: newCompte };
                    break;

                case 'AddTransaction':
                    const compte = data.comptes.find(c => c.id === variables.transactionRequest.compteId);
                    if (!compte) throw new Error("Compte non trouvé");

                    const newTransaction = {
                        id: Math.random().toString(36).substr(2, 9),
                        type: variables.transactionRequest.type,
                        montant: variables.transactionRequest.montant,
                        date: new Date().toISOString(),
                        compte: { ...compte }
                    };

                    // Update solde
                    if (newTransaction.type === 'DEPOT') {
                        compte.solde += newTransaction.montant;
                    } else {
                        compte.solde -= newTransaction.montant;
                    }

                    data.transactions.push(newTransaction);
                    saveData();
                    resultData = { addTransaction: newTransaction };
                    break;

                case 'GetAllTransactions':
                    resultData = { allTransactions: data.transactions };
                    break;

                case 'GetTotalSolde':
                    const sum = data.comptes.reduce((acc, c) => acc + c.solde, 0);
                    resultData = {
                        totalSolde: {
                            count: data.comptes.length,
                            sum: sum,
                            average: data.comptes.length ? sum / data.comptes.length : 0
                        }
                    };
                    break;

                default:
                    console.warn(`[Mock Server] No handler for ${operationName}`);
                    resultData = {};
            }

            observer.next({ data: resultData });
            observer.complete();
        } catch (error) {
            observer.error(error);
        }
    });
});
