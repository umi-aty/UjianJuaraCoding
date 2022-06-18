export function UserAction(inputType, inputValue) {
  return { type: "SET_USER", inputType: inputType, inputValue: inputValue };
}

export function LaporanAction(inputType, inputValue) {
  return { type: "SET_LAPORAN", inputType: inputType, inputValue: inputValue };
}
