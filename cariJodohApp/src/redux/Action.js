export function UserAction(inputType, inputValue) {
  return { type: "SET_USER", inputType: inputType, inputValue: inputValue };
}
