import { calculate, foodUnits, FoodItem } from "./calculator";

function displayQuantity(foodItem: FoodItem): string {
  if (foodItem.unit === "lb") {
    return `${foodItem.quantity}lbs`;
  } else if (foodItem.unit === null) {
    return `${foodItem.quantity}`;
  }
  throw Error("Bad food item");
}

function displayFoodItem(foodItem: FoodItem): string {
  return (
    `${foodItem.name.padStart(20)}|` +
    `${displayQuantity(foodItem).padStart(20)}|` +
    `${foodUnits(foodItem).toFixed(2).padStart(20)}`
  );
}

function calc(numPeople: number) {
  const foodItems = calculate(numPeople);

  const totalFus = foodItems.reduce(function (prev, fi) {
    return prev + foodUnits(fi);
  }, 0);

  console.log(
    `${"food".padStart(20)}|${"amount".padStart(20)}|${"food units".padStart(
      20
    )}`
  );
  console.log(
    `${"".padStart(20, "-")}|${"".padStart(20, "-")}|${"".padStart(20, "-")}`
  );
  for (const foodItem of foodItems) {
    console.log(displayFoodItem(foodItem));
  }
  console.log(
    `${"".padStart(20, "-")}|${"".padStart(20, "-")}|${"".padStart(20, "-")}`
  );
  console.log(
    `${"".padStart(20)}|${"".padStart(20)}|${`total: ${totalFus.toFixed(
      2
    )}fu`.padStart(20)}`
  );
}

const num = parseInt(process.argv[process.argv.length - 1]);

if (isNaN(num)) {
  console.log("Specify a number of people");
  process.exit(1);
}

if (num < 2 || num > 20) {
  console.log("Number of people should be between 2 and 20");
  process.exit(1);
}

calc(num);
