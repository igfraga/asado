import * as Ch from "@chakra-ui/react";
import { useState } from "react";
import { calculate, FoodItem } from "./asado/calculator";

interface Props {
  onCalculate: (numPeople: number) => void;
}

export function BuilderForm(props: Props) {
  const [numPeople, setNumPeople] = useState<number>(2);

  const onNumPeopleChange = (valueAsString: string, valueAsNumber: number) => {
    if (valueAsString === "") {
      setNumPeople(0);
    } else {
      setNumPeople(valueAsNumber);
    }
  };

  function onAccept() {
    props.onCalculate(numPeople);
  }

  return (
    <Ch.Flex
      direction="column"
      gap="10px"
      marginLeft="auto"
      marginRight="auto"
      width="300px"
      padding="10px"
    >
      <Ch.Flex direction="column">
        <Ch.FormLabel>Number of People</Ch.FormLabel>
        <Ch.NumberInput
          defaultValue={2}
          min={2}
          max={20}
          clampValueOnBlur={false}
          value={numPeople}
          onChange={onNumPeopleChange}
        >
          <Ch.NumberInputField />
          <Ch.NumberInputStepper>
            <Ch.NumberIncrementStepper />
            <Ch.NumberDecrementStepper />
          </Ch.NumberInputStepper>
        </Ch.NumberInput>
      </Ch.Flex>

      <Ch.Button colorScheme="blue" onClick={onAccept}>
        Aceptar
      </Ch.Button>
    </Ch.Flex>
  );
}

function displayFoodItem(foodItem: FoodItem) : string {
  if(foodItem.unit === "lb") {
    return `${foodItem.quantity}lbs ${foodItem.name}`;
  }
  else if(foodItem.unit === null) {
    return `${foodItem.quantity} ${foodItem.name}`;
  }
  throw Error("Bad food item");
}

interface ResultAreaProps {
  foodItems: FoodItem[];
}

export function ResultArea(props: ResultAreaProps) {
  return (
    <Ch.UnorderedList textAlign="start" spacing="2px" paddingLeft="6px">
      {props.foodItems.map(function (item: FoodItem) {
        return <Ch.ListItem key={item.name}>{displayFoodItem(item)}</Ch.ListItem>;
      })}
    </Ch.UnorderedList>
  );
}

export function Builder() {

  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  const onCalculate = function (numPeople: number) {
    setFoodItems(calculate(numPeople))
  };

  return (
    <Ch.Box
      marginLeft="auto"
      marginRight="auto"
      width="500px"
      backgroundColor="#F1F1F1"
    >
      <BuilderForm onCalculate={onCalculate} />

      <Ch.Box height="2px" backgroundColor="#545454" marginBottom="10px" />

      <ResultArea foodItems={foodItems}/>
    </Ch.Box>
  );
}
