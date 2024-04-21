import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


function Header({buttonLable, path}) {
  return (
    <div className="flex justify-end">
      <Button className="my-2 mt-3 mr-10"> 
        <Link to={path}> {buttonLable} </Link>  
      </Button>
    </div>
  )
}

export default Header