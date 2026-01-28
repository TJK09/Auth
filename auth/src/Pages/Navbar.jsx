import { useState, useEffect } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleScroll= () => setIsOpen(false);
        window.addEventListener('scroll',handleScroll);
        return()=>{
        window.removeEventListener('scroll',handleScroll);}
    },[]);


  return (
    <div>
        <div className="flex flex-row justify-evenly gap-3 ">
            <div className="flex logo">
                <img src="" alt="" />Logo
            </div>
            
            <div className="flex">
                <button className='h-2 w-2 border md:hidden' onClick={toggleMenu}>Alpha</button>
            <div className={`menu ${isOpen ? "flex flex-col" : "hidden"} md:flex md:flex-row gap-6`} >
            <ul className='md:flex md:flex-row flex flex-col mt-5 gap-2'>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
            </ul>
            </div>
        </div>
        </div>
        <div className="flex relative" onMouseEnter={() => setScrolled(true)} onMouseLeave={() => setScrolled(false)}>
            
            <button className=''>Service</button>
            { scrolled && (
            <div className="flex absolute top-8 bg-gray-300 text-black p-4 rounded-md shadow-lg">
            <ul>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
            </ul>
            </div>)}
        </div>
    </div>
  )
}

export default Navbar