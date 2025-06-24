export class Mask {
  public static Cnpj(cnpj : string){
    if (cnpj)
    {
      cnpj = cnpj.replace(/\D/g, "");

      if (cnpj.length !== 14) {
        return cnpj;
      }
      return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    }
  }
  public static Cpf(cpf : string)
  {
    if (cpf)
    {
      cpf = cpf.replace(/\D/g, "");

      if (cpf.length !== 11) {
        return cpf;
      }
      return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.***.***-$4");
    }
  }
}