import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//we are importing a thing named createStore from the redux node //module
import { createStore } from 'redux';

// State: this is your data!
// Describe what state looks like, as a default value

const defaultState = {
  balance: 50
};

//Actions: these are your "withdrawal" and "deposit" slips
// Rules of actions:
// 1. they must be an object
// 2. They must have a `type` key (i.e., type: 'withdrawal' or type: 'deposit')
// (optional third rule) 3. attach and additional info under a 'payload' key
//    example: payload: { amount: 5 }
//What kinds of changes would we want to make to state?
// {
//   type: 'withdraw',
//   payload: {
//     amount: 5
//   }
// }

// {
//   type: 'deposit',
//   payload: {
//     amount: 10000000
//   }
// }
// Write Action Creator Functions that generate those action objects
const WITHDRAW = 'withdraw';
const DEPOSIT = 'deposit';

const deposit = (amount) => ({
  
    type: 'deposit', //not an arg because typos
    payload: {
      amount
    }
  }
);

const withdraw = (amount) => ({
  
  type: 'withdraw', //not an arg because typos
  payload: {
    amount
  }
}
);


//Reducer: this calculates how an action changes state
const bankTeller = (state, action) =>{
  if (!action) return state;
  if (!action.payload) return state;

  let newState = {
    ...state
  };
  // - access your account balance
  //    it receives a copy of the current state
  // - see if you are doing a withdraw or deposit
  //    it receives the action
    switch (action.type){
      case DEPOSIT:
        console.log('depositing!!!!!!')
        console.log(`they currently have ${newState.balance}`)
        if (newState.balance >= 500){
          console.log(`over 500 current balance ${newState.balance}`);
          newState.balance = newState.balance + (newState.balance / 100)
        }
        newState.balance += action.payload.amount;
        console.log(`they will have ${newState.balance}`)
       
        break;
      case WITHDRAW:
        console.log('taking money out')
        let penalty = 0
        
        
        if (newState.balance - action.payload.amount < 0){
          console.log('balance too low, you are penalized $25')
          penalty = 25
        } else {
          newState.balance -= action.payload.amount;
          newState.balance -= penalty;
        }
        // if (newState.balance < 0) {
        //   console.log('not enough $$$')
        // } 
        break;
      default:
        // no change
        break;
    }
    
  // - update your balance after calculating new value
  //    it returns the new version of state!!!
  console.log(newState)
  return newState;
  

}

// The store: spoiler alert - redux gives you a function to create one
const store = createStore(bankTeller, defaultState);
//.subscribe() - you pass it a function, it runs your function when state changes
// .dispatch() -you pass it an action, it calls the reducer and updates state


// becasue we're not using react yet, we'll attach some things to the global window object:

window.store = store;
window.deposit = deposit;
window.withdraw = withdraw;

// step two, set up automatic console.log() when state changes
store.subscribe(() => {
  console.log('------------state was updated----------------')
  console.table(store.getState())
  
})







ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
