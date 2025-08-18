export const DateFormatter = {
	/**
	 * Retorna la fecha en formato: "YYYY-MM-DD HH:mm:ss"
	 * Ideal para almacenar en bases de datos SQL.
	*/
	toLocalSQLDatetime(date = new Date()) {
	  const year = date.getFullYear();
	  const month = String(date.getMonth() + 1).padStart(2, '0');
	  const day = String(date.getDate()).padStart(2, '0');
  
	  const hours = String(date.getHours()).padStart(2, '0');
	  const minutes = String(date.getMinutes()).padStart(2, '0');
	  const seconds = String(date.getSeconds()).padStart(2, '0');
  
	  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	},
  
	/**
	 * Retorna solo la fecha en formato: "YYYY-MM-DD"
	*/
	toDateOnly(date = new Date()) {
	  const year = date.getFullYear();
	  const month = String(date.getMonth() + 1).padStart(2, '0');
	  const day = String(date.getDate()).padStart(2, '0');
  
	  return `${year}-${month}-${day}`;
	},
  
	/**
	 * Retorna solo la hora en formato: "HH:mm:ss"
	*/
	toTimeOnly(date = new Date()) {
	  const hours = String(date.getHours()).padStart(2, '0');
	  const minutes = String(date.getMinutes()).padStart(2, '0');
	  const seconds = String(date.getSeconds()).padStart(2, '0');
  
	  return `${hours}:${minutes}:${seconds}`;
	},
  
	/**
	 * Retorna la fecha en formato: "DD/MM/YYYY"
	 * Útil para mostrar al usuario.
	*/
	toReadableDate(date = new Date()) {
	  const day = String(date.getDate()).padStart(2, '0');
	  const month = String(date.getMonth() + 1).padStart(2, '0');
	  const year = date.getFullYear();
  
	  return `${day}/${month}/${year}`;
	},
  
	/**
	 * Parsea una fecha en string tipo "YYYY-MM-DD HH:mm:ss" a objeto Date
	*/
	parseSQLDatetime(datetimeStr) {
	  const [datePart, timePart] = datetimeStr.split(' ');
	  const [year, month, day] = datePart.split('-');
	  const [hours = 0, minutes = 0, seconds = 0] = (timePart || '').split(':');
  
	  return new Date(
		Number(year),
		Number(month) - 1,
		Number(day),
		Number(hours),
		Number(minutes),
		Number(seconds)
	  );
	}
};
  