import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPTES } from "../graphql/queries";

const CompteList = () => {
    const { loading, error, data } = useQuery(GET_ALL_COMPTES);

    if (loading) return <div className="text-center py-10 text-gray-500">Chargement des comptes...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Erreur : {error.message}</div>;
    if (!data || !data.allComptes) return <div className="text-center py-10 text-gray-400">Aucune donnée reçue.</div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Liste des Comptes</h2>
            <div className="space-y-4">
                {data.allComptes.map((compte) => (
                    <div key={compte.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-mono text-sm text-gray-500">ID: {compte.id}</span>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${compte.type === 'COURANT' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                {compte.type}
                            </span>
                        </div>
                        <p className="text-xl font-bold text-gray-900">{compte.solde.toLocaleString()}€</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Créé le : {new Date(compte.dateCreation).toLocaleDateString()}
                        </p>
                    </div>
                ))}
                {data.allComptes.length === 0 && (
                    <p className="text-center text-gray-400 py-8">Aucun compte trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default CompteList;
