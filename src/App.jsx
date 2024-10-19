import { useState, useCallback, useEffect, useRef } from "react"

function App() {
 const [length, setLength] = useState(8)
 const [numberAllowed, setNumberAllowed] = useState(false)
 const [charAllowed, setCharAllowed] = useState(false)
 const [password, setPassword] = useState("")

 // useRef hooks 
 const passwordRef = useRef(null)

const passwordGenerator = useCallback(() => {
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (numberAllowed) str += "0123456789"
  if (numberAllowed) str += "!@#$%^&*-_+={}[]~`"
  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
  }
  setPassword(pass)
    
}, [length,numberAllowed,setPassword])

const copyPasswordToClipBoard = useCallback(() => {
  passwordRef.current?.select() 
  passwordRef.current?.setSelectionRange(0,100)
  window.navigator.clipboard.writeText(password)}, [password])

useEffect(() => {passwordGenerator()}, [length,numberAllowed,charAllowed,setCharAllowed,passwordGenerator])
  return (
    <>
     <div className="bg-black h-screen w-full pt-56">
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 text-orange-500 bg-gray-700">
     <h1 className="text-white text-center text-2xl pt-4">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden py-10">
        <input type="text" value={password} className="outline-none w-full py-2 px-3 rounded-l-lg" placeholder="password" readOnly ref={passwordRef}/>
        <button onClick={copyPasswordToClipBoard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-r-lg">copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1 mb-5">
          <input type="range" min={6} max={100} value={length} className="cursor-pointer w-32" onChange={(e) => {setLength(e.target.value)}}/>
          <label className="text-[18px]">Length: {length}</label>
        </div>
        <div className="gap-x-2">
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={() => {setNumberAllowed((prev) => !prev)}}/>
          <label className="text-[16px] pl-1">Numbers</label>
        </div>
        <div className="gap-x-2">
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={() => {setNumberAllowed((prev) => !prev)}}/>
          <label className="text-[16px] pl-1">Charactor</label>
        </div>
      </div>
     </div>
     </div>
    </>
  )
}

export default App

