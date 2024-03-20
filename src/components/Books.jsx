import  { useEffect, useState } from 'react'
import axios from 'axios'

const Books = () => {

    const [bookData, setBookData] = useState([])
    const [errors, setErrors] = useState()

    useEffect(()=>{
        axios.get("https://reactnd-books-api.udacity.com/books",{ headers: { 'Authorization': 'whatever-you-want' }})
    .then((response)=>{
        console.log(response.data.books)
        setBookData(response.data.books)
    })
    .catch((error)=>{
        console.log(error)
        if(error.response.status === 404){
            console.log("Status Code: 404")
            console.log("Website not found")
            setErrors(error.message)
        }
    })
    }, [])

    // console.log("State", bookData)

  return (
    <>
    {errors && <div className='error'>
            <h2>404</h2>
            <h1>😑 Can't find what you are looking for</h1>
        </div>}
        <div>
            {
                bookData.map((book, index)=>(
                    <div className='books-container' key={index}>
                        <h3>{book.title}</h3>
                        <div className='imgdes' style={{display:'flex'}}>
                            <img src={book.imageLinks.smallThumbnail} alt="" />
                            <p>{book.description}</p>
                        </div>
                        <h4>{book.authors.join(" ")}</h4>

                        <hr />
                    </div>
                ))
            }
        </div>
    
    </>
  )
}

export default Books
