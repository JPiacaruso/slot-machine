// 1. Deposito de cantidad dinero.
// 2. Determinar el número de lineas para apostar.
// 3. Recolectar Monto de apuesta.
// 4. Girar la maquina.
// 5. chequear si el usuario ganó.
// 6. dar al usuario el premio.
// 7. Jugar nuevamente o terminar.

const prompt = require("prompt-sync")();

const FILAS = 3;
const COLUMNAS = 3;

const CUENTA_SIMBOLOS = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const VALORES_SIMBOLOS = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposito = () => {
  while (true) {
    const totalDeposito = prompt("Ingresa un importe : ");
    const totalNumeroDeposito = parseFloat(totalDeposito);
    if (isNaN(totalNumeroDeposito) || totalNumeroDeposito <= 0) {
      console.log("Importe invalido, prueba nuevamente");
    } else {
      return totalNumeroDeposito;
    }
  }
};

const traerNumerodeLineas = () => {
  while (true) {
    const filas = prompt("Ingresa el numero de lineas para apostar (1-3): ");
    const numerodeFilas = parseFloat(filas);
    if (isNaN(numerodeFilas) || numerodeFilas <= 0 || numerodeFilas > 3) {
      console.log("Numero de líneas inválido, prueba nuevamente");
    } else {
      return numerodeFilas;
    }
  }
};

const traerApuesta = (balance, filas) => {
  while (true) {
    const apuesta = prompt("Ingresa el valor por linea: ");
    const numerodeApuesta = parseFloat(apuesta);
    if (
      isNaN(numerodeApuesta) ||
      numerodeApuesta <= 0 ||
      numerodeApuesta > balance / filas
    ) {
      console.log("Numero de apuesta inválida, prueba nuevamente");
    } else {
      return numerodeApuesta;
    }
  }
};

const girar = () => {
  const simbolos = [];
  for (const [simbolo, cuenta] of Object.entries(CUENTA_SIMBOLOS)) {
    for (let i = 0; i < cuenta; i++) {
      simbolos.push(simbolo);
    }
  }

  const carrete = [];
  for (let i = 0; i < COLUMNAS; i++) {
    carrete.push([]);
    const carreteSimbolos = [...simbolos];
    for (let j = 0; j < FILAS; j++) {
      const indiceRandom = Math.floor(Math.random() * carreteSimbolos.length);
      const simboloElegido = carreteSimbolos[indiceRandom];
      carrete[i].push(simboloElegido);
      carreteSimbolos.splice(indiceRandom, 1);
    }
  }

  return carrete;
};

const transponer = (carrete) => {
  const filas = [];

  for (let i = 0; i < FILAS; i++) {
    filas.push([]);
    for (let j = 0; j < COLUMNAS; j++) {
      filas[i].push(carrete[j][i]);
    }
  }

  return filas;
};

const printLineas = (filas) => {
  for (const fila of filas) {
    let filaString = "";
    for (const [i, simbolo] of fila.entries()) {
      filaString += simbolo;
      if (i != fila.length - 1) {
        filaString += " | ";
      }
    }
    console.log(filaString);
  }
};

const apuestaGanadora = (filas, apuesta, numerodeFilas) => {
  let ganadora = 0;
  for (let fila = 0; fila < numerodeFilas; fila++) {
    const simbolos = filas[fila];
    let todoIgual = true;

    for (const simbolo of simbolos) {
      if (simbolo != simbolos[0]) {
        todoIgual = false;
        break;
      }
    }

    if (todoIgual) {
      ganadora += apuesta * VALORES_SIMBOLOS[simbolos[0]];
    }
  }

  return ganadora;
};

const juego = () => {
  let balance = deposito();

  while (true) {
    console.log("Tienes un saldo de $" + balance)
    const numerodeFilas = traerNumerodeLineas();
    const apuesta = traerApuesta(balance, numerodeFilas);
     balance -= apuesta * numerodeFilas;
    const carrete = girar();
    const filas = transponer(carrete);
    printLineas(filas);
    const ganadora = apuestaGanadora(filas, apuesta, numerodeFilas);
    balance += ganadora;
    console.log("Ganaste, $" + ganadora.toString());

    if (balance <= 0) {
        console.log("Te has quedado sin dinero!");
        break;
    }

    const jugarNuevamente = prompt("Quieres jugar de nuevo (Si/No)?")
        if (jugarNuevamente != "si") break;
  }
};

juego();
