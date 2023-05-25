import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [lista, setLista] = useState([])
  const [nuevoElemento, setNuevoElemento] = useState('')

  useEffect(() => {
    const listaGuardada = JSON.parse(localStorage.getItem('key'))
    if (listaGuardada) {
      setLista(listaGuardada)
    }
  }, []);

  useEffect(() => {
    if(lista.length !== 0){
      localStorage.setItem('key', JSON.stringify(lista))
    }
  }, [lista]);

  const addLista = () => {
    if(nuevoElemento.trim() != ''){
      const elemento = {
        id: Date.now(),
        text: nuevoElemento,
        checked: false
      };
      setLista([...lista, elemento])
      limpiar()
    }
  }

  const cambioCheck = (id) =>{
    const nuevaLista = lista.map(elemento => {
      if (elemento.id ===id){
        return { ...elemento, checked: !elemento.checked };
      }
      return elemento
    });
    setLista(nuevaLista)
  }

  const eliminarCompletados = () => {
    const nuevaLista = lista.filter(elemento => !elemento.checked);
    setLista(nuevaLista);
    limpiar()
  }
  
  const eliminarTodos = () => {
    setLista([])
    limpiar()
  }

  const limpiar = () =>{
    document.getElementById("tarea").value=""
    setNuevoElemento("")
  }

  return (
    <div className="App">
      <h1> LISTA DE QUEHACERES</h1>
      <img src="https://s3.amazonaws.com/freestock-prod/450/freestock_557979382.jpg" className="responsiveImg" alt="404"></img>
      <br/>
      <input type="text" id="tarea" placeholder='Agregar tarea' onChange={(event)=>
      {
        setNuevoElemento(event.target.value)
      }}/>
      <button style={{margin: 10}} onClick={addLista}>Agregar Elemento</button>
      <ul>
        {lista.map(elemento => (
          <li key={elemento.id}>
            <input
              type="checkbox"
              checked={elemento.checked}
              onChange={() => cambioCheck(elemento.id)}
            />
            <span style={{ textDecoration: elemento.checked ? 'line-through' : 'none' }}>{elemento.text}</span>
          </li>
        ))}
      </ul>
      <button style={{margin: 10}} onClick={eliminarCompletados}>Eliminar Completados</button>
      <button style={{margin: 10}} onClick={eliminarTodos}>Eliminar Todos</button>
    </div>
  );
}

export default App;
