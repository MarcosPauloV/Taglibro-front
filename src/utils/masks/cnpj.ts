export function CNPJ(cnpj: string): string {
  // Remove todos os caracteres que não sejam números
  const numericCNPJ = cnpj.replace(/\D/g, "");

  // Limita a entrada a 14 caracteres (CNPJ válido)
  const truncatedCNPJ = numericCNPJ.slice(0, 14);

  // Aplica a máscara de CNPJ
  return truncatedCNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}
