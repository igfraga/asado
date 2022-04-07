import morfis from "./morfis.json";

interface FoodInfo {
  name: string;
  weight: number;
  unit: "lb" | null;
  category: string;
  recMin: number;
}

interface FoodItem {
  name: string;
  quantity: number;
  unit: "lb" | null;
}

const foods: FoodInfo[] = [];
for (const morfi of morfis) {
  foods.push({
    name: morfi.name,
    unit: morfi.unit === "lb" ? "lb" : null,
    weight: morfi.weight,
    category: morfi.category,
    recMin: morfi.recMin,
  });
}

// "funits" are food units
export function calculate(numPersons: number): FoodItem[] {
  const items: FoodItem[] = [];

  const totalFunits = numPersons * 1.0;

  const funitsByCat = new Map<string, number>();
  funitsByCat.set("meat", totalFunits * 0.5);
  funitsByCat.set("achura", totalFunits * 0.2);
  funitsByCat.set("veggie", totalFunits * 0.3);

  for (const [cat, fus] of funitsByCat) {
    const cfoods = foods.filter((food) => food.category === cat);

    const avgFus = fus / cfoods.length;

    console.log(cat);
    console.log(fus);
    console.log(avgFus);

    let fusLeft = fus;
    for (const foodInfo of cfoods) {
      if(fusLeft <= 0) {
        break;
      }
      let quantity = 0;
      if (foodInfo.recMin * foodInfo.weight < avgFus) {
        // need more than recMin
        quantity = avgFus / foodInfo.weight;
      } else if(foodInfo.recMin * foodInfo.weight > fusLeft) {
        // need less than recMin
        quantity = fusLeft / foodInfo.weight;
      }
      else {
        // recMin makes sens
        quantity = foodInfo.recMin
      }

      const item: FoodItem = {
        name: foodInfo.name,
        quantity: quantity,
        unit: foodInfo.unit,
      };

      items.push(item);

      fusLeft -= (quantity * foodInfo.weight);
    }
  }

  return items;
}

console.log(calculate(5));
