import { filterData, sortData, computeStats } from '../src/lib/dataFunctions.js';
import data from '../src/data/dataset.js';

describe('filterData', () => {
  it('Se filtra data por streamingPlatform', () => {
    const filteredData = filterData(data, 'streamingPlatform', 'Netflix');
    expect(filteredData.length).toBe(7);
    expect(filteredData[0].id).toBe('stranger-things'); // Verificamos el ID del primer elemento
    expect(filteredData[1].id).toBe('black-mirror'); // Verificamos el ID del segundo elemento
  });

  it('Se devuelve un array vacío si no hay data que coincida', () => {
    const filteredData = filterData(data, 'streamingPlatform', 'Star+');
    expect(filteredData.length).toBe(0); // Esperamos 0 resultados
  });
});

describe('sortData', () => {
  it('Se ordena la data por nombre en orden ascendente', () => {
    const sortedData = sortData(data, 'name', 'asc');
    expect(sortedData[0].name).toBe('Altered Carbon');
    expect(sortedData[23].name).toBe('Westworld');
  });

  it('Se ordena la data por nombre en orden descendente', () => {
    const sortedData = sortData(data, 'name', 'desc');
    expect(sortedData[0].name).toBe('Westworld');
    expect(sortedData[23].name).toBe('Altered Carbon');
  });

  it('Se ordena la data por año de lanzamiento ascendente', () => { 
    const sortedData = sortData(data, 'yearOfRelease','asc');
    expect(sortedData[0].facts.yearOfRelease).toBe('1959');
    expect(sortedData[23].facts.yearOfRelease).toBe('2020');
  });

  it('Se ordena la data por año de lanzamiento descendente', () => {
    const sortedData = sortData(data, 'yearOfRelease', 'desc');
    expect(sortedData[0].facts.yearOfRelease).toBe('2020');
    expect(sortedData[23].facts.yearOfRelease).toBe('1959');
  })

  it('Se ordena la data por rating promedio ascendente', () => {
    const sortedData = sortData(data, 'averageRating', 'asc');
    expect(sortedData[0].facts.averageRating).toBe('7.2');
    expect(sortedData[23].facts.averageRating).toBe('9.2');
  })

  it('Se ordena la data por rating promedio descendente', () => {
    const sortedData = sortData(data, 'averageRating', 'desc');
    expect(sortedData[0].facts.averageRating).toBe('9.2');
    expect(sortedData[23].facts.averageRating).toBe('7.2');
  })
});


describe('computeStats', () => {
  it('Se calcula los años promedio de transmisión', () => {
    const stats = computeStats(data);
    expect(stats.avgYears).toBeCloseTo(6.16, 0);
  })
});