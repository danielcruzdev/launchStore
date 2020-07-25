module.exports = {
  date(timestamp) {
    const date = new Date(timestamp)

    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)
    const hour = date.getHours()
    const minutes = date.getMinutes()

    return {
      day,
      month,
      year,
      hour,
      minutes,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }
  },
  formatPrice(price) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price / 100);
  },
  formatCpfCnpj(value){
    value = value.replace(/\D/g, "");

    if(value.length > 11 && value.length <= 14 ){
      value = value.replace(/(\d{2})(\d)/, "$1.$2"); // 00.000000000100
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // 00.000.000000100
      value = value.replace(/(\d{3})(\d)/, "$1/$2"); // 00.000.000/000100
      value = value.replace(/(\d{4})(\d)/, "$1-$2"); // 00.000.000/0001-00

      return value;
    } else if(value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // 000.00000000
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // 000.000.00000
      value = value.replace(/(\d{3})(\d)/, "$1-$2"); // 000.000.000-00

      return value
    }
    else if (value.length > 14){
      value = value.slice(0, -1)
      return value
    }
  },
  formatCep(value){
    value = value.replace(/\D/g, "");

    if(value.length <= 8 ){
      value = value.replace(/(\d{5})(\d)/, "$1-$2"); // 00.000-000;

      return value;
    } else if (value.length > 8){
      value = value.slice(0, -1)
      return value
    }
  }
};
