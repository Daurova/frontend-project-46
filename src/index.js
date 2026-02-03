import parseFile from "./parsers.js";

const genDiff = (filepath1, filepath2, format) => {
  // Здесь будет логика сравнения файлов
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  console.log('Данные из файлов:');
  console.log('file1:', data1);
  console.log('file2:', data2);
  console.log('формат:', format);
  
  // Вернем пока просто сообщение
  return 'Разница будет здесь';
};

export default genDiff;