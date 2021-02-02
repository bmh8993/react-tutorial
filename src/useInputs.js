import { useState, useCallback, useReducer } from "react";

// function useInputs(initialForm) {
//   const [form, setForm] = useState(initialForm);
//   const onChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setForm((form) => ({ ...form, [name]: value }));
//   }, []);
//   const reset = useCallback(() => setForm(initialForm), [initialForm]);
//
//   return [form, onChange, reset];
// }

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "RESET":
      return Object.keys(state).reduece((acc, curr) => {
        acc[curr] = "";
        return acc;
      }, {});
    default:
      return state;
  }
}

function useInputs(initialForm) {
  const [form, dispatch] = useReducer(initialForm);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE", name, value });
  }, []);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);
  return [form, onChange, reset];
}

export default useInputs;

// > Object.keys(obj).reduce((acc, curr) => {
// ... console.log(acc);
// ... console.log(curr);
// ... acc[curr] = '';
// ... console.log(acc);
// ... return acc;
// ... }, {});
// {}
// name
// { name: '' }
// { name: '' }
// email
// { name: '', email: '' }
// { name: '', email: '' }
