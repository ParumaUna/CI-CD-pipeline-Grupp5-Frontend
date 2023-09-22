import "./styles/Header.css"


interface IHeader {
    h1 : string
    h2: string
}

const Header = (props: IHeader) => {
    //-----------------------------------------------------------------------
    return(
        <>
      <header className='header'>
        <h1>{props.h1}</h1>
        <h2>{props.h2}</h2>
      </header>
    </>
    )
}

export default Header