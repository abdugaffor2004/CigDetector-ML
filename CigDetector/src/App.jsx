import './App.css'
import { Input } from './components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputForm } from './pieces/Form';

function App() {
  
  return (
    <div className='flex items-center justify-center h-screen'>
      {/* <Input type='file' accept=".mp4"/> */}

      <InputForm />
      <img src=""/>
    </div>
  )
}

export default App
