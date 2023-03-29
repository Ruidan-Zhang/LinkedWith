import "./Footer.css"

const Footer = () =>{

    return (
        <div className='footer-main-container'>
            <div className='single-column'>
                <p><a href = "https://www.javascript.com/" className='footer-content' target="_blank" rel="noopener noreferrer">Javascript</a></p>
                <p><a href = "https://reactjs.org/" className='footer-content' target="_blank" rel="noopener noreferrer">React</a></p>
                <p><a href = "https://redux.js.org/" className='footer-content' target="_blank" rel="noopener noreferrer">Redux</a></p>
                <p><a href = "https://www.sqlalchemy.org/" className='footer-content' target="_blank" rel="noopener noreferrer">SqlAlchemy</a></p>
            </div>
            <div className='single-column'>
                <p><a href = "https://www.postgresql.org/" className='footer-content' target="_blank" rel="noopener noreferrer">PostgresSQL</a></p>
                <p><a href = "https://html.com/" className='footer-content' target="_blank" rel="noopener noreferrer">HTML</a></p>
                <p><a href = "https://www.w3.org/TR/CSS/#css" className='footer-content' target="_blank" rel="noopener noreferrer">CSS</a></p>
                <p><a href = "https://linkedwith.onrender.com" className='footer-content' target="_blank" rel="noopener noreferrer">Hosted on Render</a></p>
            </div>
            <div className='single-column'>
                <p><a href = "https://github.com/Ruidan-Zhang" className='footer-content' target="_blank" rel="noopener noreferrer">GitHub</a></p>
                <p><a href = "https://www.linkedin.com/in/ruidan-meredith-zhang/" className='footer-content' target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
            </div>
        </div>
    )
}

export default Footer;
