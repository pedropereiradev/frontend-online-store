export function eightNumberPhone(phone) {
  const ddd = `(${phone[0]}${phone[1]}) ${phone[2]}`;
  const first = `${phone[3]}${phone[4]}${phone[5]}${phone[6]}`;
  const second = `-${phone[7]}${phone[8]}${phone[9]}${phone[10]}`;
  return `${ddd}${first}${second}`;
}

export function nineNumberPhone(phone) {
  const ddd = `(${phone[0]}${phone[1]}) `;
  const first = `${phone[2]}${phone[3]}${phone[4]}${phone[5]}`;
  const second = `-${phone[6]}${phone[7]}${phone[8]}${phone[9]}`;
  return `${ddd}${first}${second}`;
}

export function formatCpf(cpf) {
  const first = `${cpf[0]}${cpf[1]}${cpf[2]}`;
  const second = `.${cpf[3]}${cpf[4]}${cpf[5]}`;
  const third = `.${cpf[6]}${cpf[7]}${cpf[8]}`;
  const fourth = `-${cpf[9]}${cpf[10]}`;
  return `${first}${second}${third}${fourth}`;
}
