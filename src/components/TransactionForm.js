import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TRANSACTION } from '../graphql/mutations';
import { GET_ALL_COMPTES, GET_ALL_TRANSACTIONS } from '../graphql/queries';

const TransactionForm = () => {
    const [montant, setMontant] = useState('');
    const [type, setType] = useState('DEPOT');
    const [compteId, setCompteId] = useState('');

    const { data: comptesData } = useQuery(GET_ALL_COMPTES);

    const [addTransaction, { loading }] = useMutation(ADD_TRANSACTION, {
        refetchQueries: [
            { query: GET_ALL_TRANSACTIONS },
            { query: GET_ALL_COMPTES }
        ],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!compteId) return;

        try {
            await addTransaction({
                variables: {
                    transactionRequest: {
                        montant: parseFloat(montant),
                        type,
                        compteId,
                    },
                },
            });
            setMontant('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la transaction :', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Nouvelle Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Compte</label>
                    <select
                        value={compteId}
                        onChange={(e) => setCompteId(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 underline-none outline-none transition-all"
                    >
                        <option value="">Sélectionnez un compte</option>
                        {comptesData?.allComptes.map((compte) => (
                            <option key={compte.id} value={compte.id}>
                                {compte.id} ({compte.solde}€ - {compte.type})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Montant</label>
                    <input
                        type="number"
                        step="0.01"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                        placeholder="Ex: 50.00"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    >
                        <option value="DEPOT">Dépôt</option>
                        <option value="RETRAIT">Retrait</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading || !compteId}
                    className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all ${loading || !compteId ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 active:scale-95 shadow-lg shadow-purple-200'
                        }`}
                >
                    {loading ? 'Traitement...' : 'Ajouter la transaction'}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
