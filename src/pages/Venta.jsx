import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import VentaForm from "../components/VentaForm";

export default function VentaPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <VentaForm />
        </main>
      </div>
    </div>
  );
}
