/**
 * textContent = introduz algum texto dentro da tag
 * innerHTML = introduz tags html dentro da tag
 * value = introduz ou recupera valores dentro de inputs
 */

const inputCpf = document.querySelector("#inputCpf");
const erroInput = document.querySelector(".erro-input");
const spinner = document.querySelector(".spinner-loading");

const form = document.querySelector(".form-onboarding");

//ao submeter o formulario (apertar enter)
form.addEventListener("submit", (event) => {
    //não queremos que seja submito para a action
    //previnimos o comportamento padrão do navegador
    event.preventDefault();
});

const unmaskedCpf = (maskedCpf) => {
  return maskedCpf.replace(/\D/g, "");
};

const handeCpfInput = (event) => {
  //tiramos a máscara do cpf para podermos validar
  const unmaskCpf = unmaskedCpf(event.target.value);
  //se o cpf for valido
  if (validaCpf(unmaskCpf)) {
    //esconde a mensagem do erro
    erroInput.style.display = "none";
    inputCpf.style.borderBottom = "1px solid black";
    //redireciona pro site da avanade
    redirectAvanade();
  } else {
    //aparece a mensagem do erro
    erroInput.style.display = "block";
    inputCpf.style.borderBottom = "1px solid red";
  }

  //colocando mascara no cpf digitado pelo usuario
  const maskedCpf = mascaraCpf(event.target.value);
  //coloca o cpf com mascara no input
  event.target.value = maskedCpf;
};

const redirectAvanade = () => {

    //mostramos o loading
    spinner.style.display = "block"

    //contar segundos
    setTimeout(() => {
    //redirecionar para o site avanade
    window.location.href = "https://www.avanade.com/pt-br/";
    },2000);//2 segundos

  
};

inputCpf.addEventListener("input", handeCpfInput);

const mascaraCpf = (cpf) => {
  return cpf
    ? cpf
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
    : "";
};

const validaCpf = (cpf) => {
  var soma;
  var resto;
  soma = 0;
  if (cpf == "00000000000") return false;

  for (i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);

  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(10, 11))) return false;
  return true;
};
