import React from 'react';
import Mars from './components/Mars';
import Saturn from './components/Saturn';
import Uranus from './components/Uranus';
import Earth from './components/Earth'
import Mercury from './components/Mercury'
import Venus from './components/Venus'
import Jupiter from './components/Jupiter';
import Neptune from './components/Neptune';
import Moon from './components/Moon';
function App() {
  return (
    <div >
      <Mercury />
      <Venus size={.3}/>
      <Earth size={.3}/>
      <Moon size={.1}/>
      <Mars size={.25}/>
      <Jupiter size = {.4}/>
      <Neptune size={.3}/>
      {/* <Saturn/>
      <Uranus/> */}

    </div>
  );
}

export default App;
