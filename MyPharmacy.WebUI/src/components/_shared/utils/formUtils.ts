import React from 'react';

export const generateFormFields = (entity: Record<string, any>) => {
  return Object.keys(entity).map((key) => {
    const value = entity[key];
    if (typeof value === 'string') {
      return (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          <input id={key} type="text" name={key} defaultValue={value} />
        </div>
      );
    }
    if (typeof value === 'number') {
      return (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          <input id={key} type="number" name={key} defaultValue={value} />
        </div>
      );
    }
    // Add more cases here if needed (e.g., for dates, booleans, etc.)
    return null;
  });
};
