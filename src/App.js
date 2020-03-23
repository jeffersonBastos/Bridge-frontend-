import React, { useState }  from 'react';
import api from './services/api';
import './App.css';

import logo from './imgs/Bridge.png';

function App() {
  const [number, setNumber] = useState('');
  const[isPrime, setIsPrime] = useState('');
  const[divisores, setDivisores] = useState([]);

  async function handleSubmit(event){
    event.preventDefault();

    if(number < 1) {
      alert("Insira um número inteiro positivo")
    } else {
      const response = await api.post('/div', {number});
      if(response.data.isPrime === true) {
        setIsPrime('É');
      } else {
        setIsPrime('NÃO É');
      }
      setDivisores(response.data.divisores);
      salvarHistorico(); 
      function salvarHistorico(){
        var lista_numeros = JSON.parse(localStorage.getItem('valoresPesquisados') || '[]');
        lista_numeros.push( number );
        localStorage.setItem("valoresPesquisados", JSON.stringify(lista_numeros));
      }            
    }

  }
  
  return (
    <div>
    <header className="header">
      <div className="container">
        <div className="logo max-logo">
            <img src={logo} alt="logomarca da bridge_"/>
        </div>
        <nav className="nav-bar max-nav">
          <ul>
            <li><a href="#inicio">inicio</a></li>
            <li><a href="#historico">historico</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <section className="ghost"></section>
    <main> 
      <section id= "inicio">
        <div className="content">
            <p>
              Digite o numero que deseja calcular:
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="number">NUMERO *</label>
              <input 
                type="number" 
                id="number" 
                placeholder="Numero"
                value={number}
                required
                onChange={event => setNumber(event.target.value)} 
              />

              <button type="submit">Calcular</button>


            </form>
        </div>
        {isPrime ? 
            <div className="result">
              <h3>Número {number}:</h3>
              <p> O número {number} <strong>{isPrime}</strong> primo e seus divisores são:</p>
              <ul>
               <li>{divisores.join(', ')}</li>
              </ul>
            </div>
             : 
             ''}
        
      </section>
      <section id= "historico">Historico de calculos:
          <div className="content2">
            <ul>
               <li>{ localStorage.getItem('valoresPesquisados')?
               localStorage.getItem('valoresPesquisados').replace(/([^\d])+/gim, '-> ') :''
               }</li>
            </ul>
          </div>
      
      </section>
    </main>
    </div>
  );
}

export default App;
