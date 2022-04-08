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

type Unit = "lb" | null;

interface FoodInfo {
  name: string;
  weight: number;
  unit: Unit;
  category: string;
  recMin: number;
}

export interface FoodItem {
  name: string;
  quantity: number;
  unit: Unit;
}

function unitMod(unit: Unit) {
  if(unit === "lb") {
    return 0.5;
  }
  else {
    return 1;
  }
}

function toNearest(quantity: number, unit: Unit) : number {
  const mod = unitMod(unit);
  return Math.round(quantity / mod) * mod;
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
        quantity = toNearest(avgFus / foodInfo.weight, foodInfo.unit);
      } else if(foodInfo.recMin * foodInfo.weight > fusLeft) {
        // need less than recMin
        quantity = toNearest(fusLeft / foodInfo.weight, foodInfo.unit);
      }
      else {
        // recMin makes sens
        quantity = foodInfo.recMin
      }

      if(quantity === 0) {
        continue;
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
