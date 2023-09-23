import { jsxs, jsx, Fragment } from 'react/jsx-runtime';

function l({logoSrc:a,logoAlt:n,page:r}){return jsxs("div",{className:"flex py-4 px-8 justify-between items-center border-b-[1px] border-[#363636]",children:[jsxs("div",{className:"flex gap-4 items-center",children:[jsx("img",{alt:n,src:a}),jsx("p",{className:"font-black inline-block",children:"COLLEGE NOTES"})]}),jsx("div",{className:"",children:r==="homepage"?jsx("button",{className:"border-[1px] bg-transparent py-1 px-5 rounded-lg",children:"Log In"}):jsx(Fragment,{})})]})}

export { l as a };
