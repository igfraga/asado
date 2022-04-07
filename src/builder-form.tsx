import * as Ch from "@chakra-ui/react";

export function BuilderForm() {
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
        >
          <Ch.NumberInputField />
          <Ch.NumberInputStepper>
            <Ch.NumberIncrementStepper />
            <Ch.NumberDecrementStepper />
          </Ch.NumberInputStepper>
        </Ch.NumberInput>
      </Ch.Flex>

      <Ch.Button colorScheme="blue">Aceptar</Ch.Button>
    </Ch.Flex>
  );
}

export function ResultArea() {
  return (
    <Ch.UnorderedList textAlign="start" spacing="2px" paddingLeft="6px">
      <Ch.ListItem>3 choris</Ch.ListItem>
      <Ch.ListItem>2 morcillas</Ch.ListItem>
    </Ch.UnorderedList>
  );
}

export function Builder() {
  return (
    <Ch.Box
      marginLeft="auto"
      marginRight="auto"
      width="500px"
      backgroundColor="#F1F1F1"
    >
      <BuilderForm />

      <Ch.Box height="2px" backgroundColor="#545454" marginBottom="10px"/>

      <ResultArea />
    </Ch.Box>
  );
}
