import morfis from "./morfis.json";

const allFoods = new Map<string, FoodInfo>();

for (const morfi of morfis) {
  allFoods.set(morfi.name, {
    name: morfi.name,
    unit: morfi.unit === "lb" ? "lb" : null,
    weight: morfi.weight,
    category: morfi.category,
    recMin: morfi.recMin,
  });
}

interface FoodInfo {
  name: string;
  weight: number;
  unit: "lb" | null;
  category: string;
  recMin: number;
}

export interface FoodItem {
  name: string;
  quantity: number;
  unit: "lb" | null;
}

/// Returns the value in food units of 'foodItem'
export function foodUnits(foodItem: FoodItem) : number {
  const finfo = allFoods.get(foodItem.name);
  if(finfo === undefined) {
    throw Error("No such food");
  }
  if(finfo.unit !== foodItem.unit) {
    throw Error("Bad food item");
  }
  return finfo.weight * foodItem.quantity;
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
    const cfoods = Array.from(allFoods.values()).filter((food) => food.category === cat);

    const avgFus = fus / cfoods.length;

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
