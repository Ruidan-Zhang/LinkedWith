import "./Footer.css"

const Footer = () =>{

    return (
        <div className='footer-main-container'>
            <div className='single-column'>
                <p><a href = "https://www.javascript.com/" className='footer-content'>Javascript</a></p>
                <p><a href = "https://reactjs.org/" className='footer-content'>React</a></p>
                <p><a href = "https://redux.js.org/" className='footer-content'>Redux</a></p>
                <p><a href = "https://www.sqlalchemy.org/" className='footer-content'>SqlAlchemy</a></p>
            </div>
            <div className='single-column'>
                <p><a href = "https://www.postgresql.org/" className='footer-content'>PostgresSQL</a></p>
                <p><a href = "https://html.com/" className='footer-content'>HTML</a></p>
                <p><a href = "https://www.w3.org/TR/CSS/#css" className='footer-content'>CSS</a></p>
                <p><a href = "https://linkedwith.onrender.com" className='footer-content'>Hosted on Render</a></p>
            </div>
            <div className='single-column'>
                <p><a href = "https://github.com/Ruidan-Zhang" className='footer-content'>GitHub</a></p>
                <p><a href = "https://www.linkedin.com/in/ruidan-meredith-zhang/" className='footer-content'>LinkedIn</a></p>
            </div>
        </div>
    )
}

export default Footer;
