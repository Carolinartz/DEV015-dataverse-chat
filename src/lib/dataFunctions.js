// Función para filtrar data
export const filterData = (data, filterBy, value) => {
  // console.log(`Filter by: ${filterBy}, Value: ${value}`);
  return data.filter(item => item.facts[filterBy] === value); // Especificar la propiedad facts para filtrar con lo que coincida con valor
};
  
// Función para ordenar data por propiedad y orden específico
export const sortData = (data, sortBy, sortOrder) => {
  //determinar la dirección del ordenamiento: 1 para ascendente y -1 para descendente
  const sortDirection = sortOrder === 'asc' ? 1 : -1;
  //utilizar el método sort del array para ordenar los datos
  return data.sort((a,b) => {
    //obtener los valores a comparar de cada objeto
    const valueA = a.facts[sortBy] || a[sortBy];
    const valueB = b.facts[sortBy] || b[sortBy];
    //utilizar localeCompare para comparar cadenas de texto, multiplicado por sortDirection para ordenar ascendente o descendente
    return sortDirection * valueA.localeCompare(valueB);
  });
};
  
//Función para cálculo estadístico
export const computeStats = (data) => {
  //Promedio de años de transmisión de series
  const totalYears = data.reduce((acc, item) => {
    const startYear = parseInt(item.facts.yearOfRelease);
    const endYear = parseInt(item.facts.yearOfEnd);
      
    // Verifica que ambos años sean números válidos
    if (!isNaN(startYear) && !isNaN(endYear)) {
      return acc + (endYear - startYear + 1); // +1 para incluir el año de inicio
    }
    return acc;
  }, 0);
  
  const avgYears = totalYears / data.length;
  
  return { avgYears };
};