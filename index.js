const hummus = function(factor) {
    const ingredient = function(amount, unit, name) {
      let ingredientAmount = amount * factor;
      if (ingredientAmount > 1) {
        unit += "s";
      }
      console.log(`${ingredientAmount} ${unit} ${name}`);
      return {
        amount: ingredientAmount,
        unit,
        name
      };
    };
  
    return {
      chickpeas: ingredient(1, "can", "chickpeas"),
      anotherIngredient: ingredient(2, "tablespoon", "olive oil"),
      // Add more ingredients as needed
    };
  };
  
  console.log(hummus(10));
  