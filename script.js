//  Complete JavaScript and some CSS by Daksh. Taught by Jonas Schmedtmann, HTML and partial CSS code by Jonas Schmedtmann. 


'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann', //Instructor of the course
  //Sir, Jonas Schmedtmann, to be accurate.
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // Funny how accurate it is when compared to FD!!! we have a freaking 6% inflation AT MINIMUM!!!!!
  pin: 1111,
};

const account2 = {
  owner: 'Yeet Boomer',//Lol!
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Baba Yaga',//COD?...YUP
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};
//PS. I'm Broke!
const account4 = {
  owner: 'Daksh Kitukale', //✌🏻
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1.2,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Updated code!!

// const displayMovements = function(movements,sort=false){
//   const movs = sort?movements.slice().sort((a,b)=>a-b):movements;
//   movs.forEach(function(mov,ind){
//     const m_type= mov > 0 ? 'deposit' : 'withdrawal';
//     const html_ele =`
//     <div class="movements__row">
//       <div class="movements__type movements__type--${m_type}">${ind+1} ${m_type}</div>
//         <div class="movements__date">Date_here</div>
//       <div class="movements__value">${mov}</div>
//     </div>
//     `;
//     containerMovements.insertAdjacentHTML('afterbegin',html_ele);
//   });
// }

//=>


const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort?acc.movements.slice().sort((a, b) => a - b):acc.movements;
 
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //const date = new Date(acc.movementsDates[i]);
    //const displayDate=`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

    //The date element didn't work!!
    //I mean it was the computer....YUP!
    //COMPUTER, that's where the fault was 👻


    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}$</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const UpdateUI = function(acc){
  displayMovements(acc);
  calcPrintBalance(acc);
  calcDisplaySummery(acc);
}
const startLogOutTimer = function(){
  const tick = function(){
    const min=String(Math.trunc(totalTime/60)).padStart(2,0);
    const sec = String(totalTime%60).padStart(2,0);
    labelTimer.textContent=`${min}:${sec}`; 
    if(totalTime===0){
      clearInterval(timer);
      labelWelcome.textContent='Log in to get started';
      containerApp.style.opacity=0;
    }
    totalTime--;
  }
  let totalTime=300;
  tick();
  const timer=setInterval(tick,1000);
  return timer;
};
const calcPrintBalance = function(acc){
  acc.balance=acc.movements.reduce((acc,mov)=>acc+mov,0);
  labelBalance.textContent=`${acc.balance.toFixed(2)} $`;
}

const calcDisplaySummery = function(acc){
  const incomes = acc.movements.filter(mov=>mov>0).reduce((acc,mov)=>acc+mov,0);
  labelSumIn.textContent=`${incomes.toFixed(2)}$`;
  
  const outcomes = acc.movements.filter(mov=>mov<0).reduce((acc,mov)=>acc+mov,0);
  labelSumOut.textContent=`${Math.abs(outcomes).toFixed(2)}$`;

  const interest = acc.movements.filter(mov=>mov>0).map(depo=>depo*acc.interestRate/100).filter(inter => inter>=1).reduce((acc,mov)=>acc+mov,0);
  labelSumInterest.textContent=`${interest.toFixed(2)}%`;
}


//Event handeler 

let currentAccount,timer;
//Auto Login for testing!

// currentAccount=account1; 
// UpdateUI(currentAccount);
// containerApp.style.opacity=0;

const now = new Date();
labelDate.textContent=`${now.getDate()}/${now.getMonth()}/${now.getFullYear()} , ${now.getHours()}:${now.getMinutes()}`.padStart(2,0);

btnLogin.addEventListener('click',function(e){
  e.preventDefault();
  currentAccount=accounts.find(acc=>acc.username===inputLoginUsername.value);
  if(currentAccount?.pin===Number(inputLoginPin.value)){
    labelWelcome.textContent=`Welcome back, ${currentAccount.owner.split(' ')[0]}`;
  }
  containerApp.style.opacity=100;
  inputLoginUsername.value=inputLoginPin.value='';
  inputCloseUsername.value=inputClosePin.value='';
  inputLoginPin.blur();
  if(timer){
    clearInterval(timer);
  }
  timer=startLogOutTimer();
  UpdateUI(currentAccount);
});

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc =accounts.find(acc=>acc.username===inputTransferTo.value);
  inputTransferAmount.value=inputTransferTo.value='';
  if(amount>0 && currentAccount.balance >= amount && receiverAcc?.username!== currentAccount.username && receiverAcc){
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    UpdateUI(currentAccount);
    clearInterval(timer);
    timer=startLogOutTimer();
  }
});

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if(amount>0 && currentAccount.movements.some(mov=>mov>=amount/10))
    setTimeout(function(){
    currentAccount.movements.push(amount);
    UpdateUI(currentAccount);
    inputLoanAmount.value='';
    },2000);
    clearInterval(timer);
    timer=startLogOutTimer();
});

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if(inputCloseUsername.value===currentAccount.username && Number(inputClosePin.value)===currentAccount.pin){
    const index=accounts.findIndex(acc=>acc.username===currentAccount.username);
    accounts.splice(index,1);
    containerApp.style.opacity=0;
  }
  inputCloseUsername.value=inputClosePin.value='';
});

let sorted=false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount,!sorted);
  sorted=!sorted;
});




