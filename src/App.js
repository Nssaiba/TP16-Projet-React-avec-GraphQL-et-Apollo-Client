import React from 'react';
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import CompteList from "./components/CompteList";
import CreateCompte from "./components/CreateCompte";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Gestion des Comptes & Transactions
            </h1>
            <p className="text-gray-500 text-lg">Système de gestion financière via GraphQL</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Colonne de Gauche : Gestion des Comptes */}
            <div className="space-y-8">
              <section className="transform transition-all hover:translate-y-[-4px]">
                <CreateCompte />
              </section>
              <section className="transform transition-all hover:translate-y-[-4px]">
                <CompteList />
              </section>
            </div>

            {/* Colonne de Droite : Gestion des Transactions */}
            <div className="space-y-8">
              <section className="transform transition-all hover:translate-y-[-4px]">
                <TransactionForm />
              </section>
              <section className="transform transition-all hover:translate-y-[-4px]">
                <TransactionList />
              </section>
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
