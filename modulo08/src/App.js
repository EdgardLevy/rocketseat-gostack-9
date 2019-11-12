import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { connectableObservableDescriptor } from '../../../../../../Users/edgardlevy/Library/Caches/typescript/3.6/node_modules/rxjs/internal/observable/ConnectableObservable';

function App() {
  const [techs, setTechs] = useState([])
  const [newTech, setNewTech] = useState('');
  //garante que a funcao seja executada apenas na alteracao das dependencias
  //sem precisar recriar do zero toda vez o handleAdd
  const handleAdd = useCallback(() => {
    console.log('handleAdd')
    setTechs([...techs, newTech])
    setNewTech('')
  }, [newTech, techs])
  //similar o componentDidMount
  useEffect(() => {
    const _techs = localStorage.getItem('techs');
    if (_techs)
      setTechs(JSON.parse(_techs))

    //funcao executada sempre que deixar de desistir
    return () => {
      console.log('unmount')
    }

  }, [])


  //similar a componentDidUpdate
  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs))
  }, [techs])

  const techSize = useMemo(() => techs.length, [techs])



  return (
    <>
      <ul>
        {techs.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br />
      <input type="text" onChange={(e) => setNewTech(e.target.value)} value={newTech} />
      <button type="button" onClick={handleAdd}>Adicionar</button>
    </>
  );
}

export default App;
