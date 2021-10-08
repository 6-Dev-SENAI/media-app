function limparCss(input, id) {
  input.classList.remove("text-uppercase");
  let listaClasses = [...input.classList];

  if (listaClasses.some((x) => x === "text-danger")) {
    input.classList.remove("text-danger");
    input.value = "";
  }

  document.getElementById(`media${id}`).textContent = "";
}

function validar(nomeInput) {
  const caracNotAllowed = [
    "`",
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "[",
    "]",
    "{",
    "}",
    "|",
    ";",
    ":",
    ",",
    "<",
    ".",
    ">",
    "/",
    "?",
    "-",
    "_",
    "=",
    "+",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];

  let nome = nomeInput.value;

  for (let letra of nome) {
    if (caracNotAllowed.some((carac) => carac === letra)) {
      nomeInput.classList.add("text-danger");
      nomeInput.value = "Não use números/caracteres especiais no nome!";
      return true;
    }
  }

  return false;
}

function validarNome(id) {
  let nota1 = document.getElementById(`nota${id}1`).value;
  let nota2 = document.getElementById(`nota${id}2`).value;
  let nota3 = document.getElementById(`nota${id}3`).value;
  let nota4 = document.getElementById(`nota${id}4`).value;

  let notas = [nota1, nota2, nota3, nota4];

  var nomeInput = document.getElementById(`nome${id}`);
  let nome = nomeInput.value.trim();

  if (nome === "") nomeInput.value = "";
  else nomeInput.classList.add("text-uppercase");

  if (validar(nomeInput)) {
    return;
  }

  if (notas.some((x) => x !== "")) calcMedia(id);
}

function validarInput(id, index) {
  var notaInput = document.getElementById(`nota${id}${index}`);
  let nota = notaInput.value;

  if (nota === "") {
    notaInput.value = "";
  } else if (parseFloat(nota) < 0) {
    notaInput.value = "";
  } else if (parseFloat(nota) > 100) {
    notaInput.value = (100).toFixed(1);
    calcMedia(id);
  } else {
    notaInput.value = parseFloat(nota).toFixed(1);
    calcMedia(id);
  }
}

function calcMedia(id) {
  let nome = document.getElementById(`nome${id}`);
  nome.value = nome.value.trim();
  var mediaDiv = document.getElementById(`media${id}`);

  if (nome.value === "") {
    nome.value = "";
    mediaDiv.innerText = "Preencha o nome!";
    return;
  }

  let nota1 = parseFloat(document.getElementById(`nota${id}1`).value | 0);
  let nota2 = parseFloat(document.getElementById(`nota${id}2`).value | 0);
  let nota3 = parseFloat(document.getElementById(`nota${id}3`).value | 0);
  let nota4 = parseFloat(document.getElementById(`nota${id}4`).value | 0);
  let notas = [nota1, nota2, nota3, nota4];

  let soma = notas.reduce((anterior, atual) => anterior + atual);

  let media = soma / notas.length;

  mediaDiv.innerText = media.toFixed(1);

  verificarSituacao(id, media);
}

function verificarSituacao(id, media) {
  var situacaoDiv = document.getElementById(`situacaoTd${id}`);
  var situacaoTexto = document.getElementById(`situacao${id}`);

  if (media >= 70) {
    situacaoTexto.innerText = "Aprovado";
    situacaoDiv.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
  } else if (media >= 50 && media < 70) {
    situacaoTexto.innerText = "Recuperação";
    situacaoDiv.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
  } else {
    situacaoTexto.innerText = "Reprovado";
    situacaoDiv.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
  }

  calcMediaGeral();
}

function calcMediaGeral() {
  let media1 = parseFloat(document.getElementById(`media1`).textContent | 0);
  let media2 = parseFloat(document.getElementById(`media2`).textContent | 0);
  let media3 = parseFloat(document.getElementById(`media3`).textContent | 0);
  let media4 = parseFloat(document.getElementById(`media4`).textContent | 0);
  let media5 = parseFloat(document.getElementById(`media5`).textContent | 0);
  let media6 = parseFloat(document.getElementById(`media6`).textContent | 0);
  let medias = [media1, media2, media3, media4, media5, media6];

  let soma = medias.reduce((anterior, atual) => anterior + atual);
  let media = soma / medias.length;

  var mediaGeral = document.getElementById("mediaGeral");
  mediaGeral.innerText = media.toFixed(1);
}

function criarHTML(nome, media) {
  var linha = `<tr>
                    <td class="align-middle text-truncate text-uppercase"><p class='p-0 m-0'>${nome}</p></td>
                    <td class="align-middle"><p class='p-0 m-0'>${media.toFixed(
                      1
                    )}</p></td>
                 </tr>`;

  return linha;
}

function verificar() {
  let aluno1 = {
    nome: document.getElementById("nome1").value,
    media: parseFloat(document.getElementById("media1").textContent),
  };
  let aluno2 = {
    nome: document.getElementById("nome2").value,
    media: parseFloat(document.getElementById("media2").textContent),
  };
  let aluno3 = {
    nome: document.getElementById("nome3").value,
    media: parseFloat(document.getElementById("media3").textContent),
  };
  let aluno4 = {
    nome: document.getElementById("nome4").value,
    media: parseFloat(document.getElementById("media4").textContent),
  };
  let aluno5 = {
    nome: document.getElementById("nome5").value,
    media: parseFloat(document.getElementById("media5").textContent),
  };
  let aluno6 = {
    nome: document.getElementById("nome6").value,
    media: parseFloat(document.getElementById("media6").textContent),
  };

  let alunos = [aluno1, aluno2, aluno3, aluno4, aluno5, aluno6];

  let mediaGeral = parseFloat(
    document.getElementById("mediaGeral").textContent
  );

  let linhas = [];

  for (let aluno of alunos) {
    if (aluno.media < mediaGeral) {
      linhas.push(criarHTML(aluno.nome, aluno.media));
    }
  }

  var table = document.getElementById("abaixoMedia");
  table.innerHTML = "";

  for (let linha of linhas) {
    table.innerHTML += linha;
  }
}
