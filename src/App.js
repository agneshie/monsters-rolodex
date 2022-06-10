// import { Component } from 'react';
import { useEffect, useState } from 'react';

import CardList from './CardList/CardList.component';
import SearchBox from './SearchBox/SearchBox.component';
import './App.css';

function App() {
  
  const [ searchField, setSearchField ] = useState('');
  const [ monsters, setMonsters ] = useState([]);
  const [ filteredMonsters, setFilteredMonsters ] = useState(monsters);
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);


  const onSearchChange = (event) => {
    const searchFieldValue = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldValue);
  }

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox 
        className='monsters-search-box'
        placeholder='search monsters'
        onChangeHandler={onSearchChange}
      />
      <CardList 
        monsters={filteredMonsters}
      />
    </div>
  );
}

// class App extends Component {

//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     };
//     console.log('constructor');
//   }

//   componentDidMount() {
//     console.log('componentDidMount');
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => response.json())
//     .then((users) => this.setState(
//       () => {
//         return { monsters: users }
//       },
//       () => {
//         console.log(this.state)
//       }
//     ))
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value;
//     this.setState(() => {
//       return { searchField };
//     });
//   }

//   render() {
//     console.log('render');
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
    
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase());
//     });

//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox 
//           className='monsters-search-box'
//           placeholder='search monsters'
//           onChangeHandler={onSearchChange}
//         />
//         <CardList 
//           monsters={filteredMonsters}
//         />
//       </div>
//     );
//   }
// }

export default App;
