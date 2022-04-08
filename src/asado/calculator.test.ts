
import {calculate} from './calculator'

test("calculator", async () => {
  for(let numPeople = 2; numPeople <= 20; numPeople++) {
    expect(numPeople).toEqual(numPeople);

    const items = calculate(numPeople);
    expect(items.length).toBeGreaterThan(0);
  }
})
