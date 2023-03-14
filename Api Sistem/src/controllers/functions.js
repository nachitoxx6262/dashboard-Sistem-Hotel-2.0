 const filtroDni = (dni) => {
    dni = dni.trim();
    // Dividimos la cadena por los caracteres de separación
    let datos = dni.split('"');
    // Eliminamos los elementos vacíos
    datos = datos.filter((d) => d !== "");
    // Retornamos los datos en forma de array
    return datos;
  };

   const data_Dni = (datos)=>{
    let name = `${datos[1] + " " + datos[2]}`
    let gender = `${datos[3]}`
    let dni = `${datos[4]}`
    let birthdate= `${datos[6]}`
    return {name,gender,dni,birthdate}
  }
   const data_DniI= (datos)=>{
    let name= `${datos[3] + " " + datos[4]}`
    let gender= `${datos[7]}`
    let dni= `${datos[0]}`
    let birthdate= `${datos[6]}`
  
    return {name,gender,dni,birthdate}
  }
  
  module.exports = {
    data_DniI,
    data_Dni,
    filtroDni,
  };
  