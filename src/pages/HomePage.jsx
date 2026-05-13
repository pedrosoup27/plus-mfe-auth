import React from "react";

export default function HomePage({ aoSair }) {
    return(
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1> Página home!!!</h1>
        <p>Você logou.</p>
      
      <button onClick={aoSair} style={{ padding: '10px', marginTop: '20px' }}>
        Sair (Logout)
      </button>
    </div>
    );
}