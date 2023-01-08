


const toCamelCase = (rows: any[]) => {
  console.log(rows)
  return rows.map((row: any) => {
    const replaced  = {} as any;

    for (let key in row) {
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
        $1.toUpperCase().replace('_', '')
      );
      (replaced as any)[camelCase] = (row as any)[key];
    }
    return replaced;
  });
};

export default toCamelCase;
