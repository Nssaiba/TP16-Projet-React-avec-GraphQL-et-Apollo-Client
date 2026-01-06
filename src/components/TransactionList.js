import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TRANSACTIONS } from "../graphql/queries";

const TransactionList = () => {
    const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS);

    if (loading) return <div className="text-center py-10 text-gray-500">Chargement des transactions...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Erreur : {error.message}</div>;
    if (!data || !data.allTransactions) return <div className="text-center py-10 text-gray-400">Aucune donnée reçue.</div>;
    if (!data || !data.allTransactions) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Historique des Transactions</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-400 border-b text-sm">
                            <th className="pb-3 font-medium">Date</th>
                            <th className="pb-3 font-medium">Type</th>
                            <th className="pb-3 font-medium">Montant</th>
                            <th className="pb-3 font-medium">Compte ID</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {data.allTransactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 text-sm text-gray-600">
                                    {new Date(transaction.date).toLocaleDateString()}
                                </td>
                                <td className="py-3">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${transaction.type === 'DEPOT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {transaction.type}
                                    </span>
                                </td>
                                <td className={`py-3 font-bold ${transaction.type === 'DEPOT' ? 'text-green-600' : 'text-red-600'}`}>
                                    {transaction.type === 'DEPOT' ? '+' : '-'}{transaction.montant.toLocaleString()}€
                                </td>
                                <td className="py-3 text-sm text-gray-500 font-mono">
                                    {transaction.compte.id}
                                </td>
                            </tr>
                        ))}
                        {data.allTransactions.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-400 py-8">Aucune transaction trouvée.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionList;
