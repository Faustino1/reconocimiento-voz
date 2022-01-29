import style from "styled-components";

export const MyButton = style.button`
 text-aling: center;
 color: #000;
 text-transform: uppercase;
 font-weight: 600;
 cursor: pointer;
 display: inline-block;
 `

export const NewButton = style(MyButton)`
 width: 130px;
 padding-top: 10px;
 padding-bottom: 10px;
 margin-right: 10px;
 background-color: transparent;
 border-radius: 50px;
 border: 3px solid ${({ status }) => status === "hecho" ? "green" : status === "enproceso" ? "orange" : "red"};
 color:  ${({ status }) => status === "hecho" ? "green" : status === "enproceso" ? "orange" : "red"};

 &:hover{
     box-shadow: 0 0 10px 0 ${({ status }) => status === "hecho" ? "green" : status === "enproceso" ? "orange" : "red"} inset, 0 0 20px ${({ status }) => status === "hecho" ? "green" : status === "enproceso" ? "orange" : "red"};
 }

 &:focus{
    outline-width: 0;
 }
 `

export const Neondiv = style(NewButton)`
 width: 90%;
 padding-left: 10px;
 margin-right: 10px;
 padding-bottom: 10px;
text-transform: capitalize;
`
