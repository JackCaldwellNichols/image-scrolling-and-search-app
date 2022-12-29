import React, {useEffect, useState} from "react";
import Photo from "./Photo.jsx";

const cliendID = `?client_id=` //add api key
const mainURL = `https://api.unsplash.com/photos`
const searchURL = `https://api.unsplash.com/search/photos`

const Home = () => {

const [photos, setPhotos] = useState([])
const [query, setQuery] = useState('')
const [loading, setLoading] = useState(false)
const [page, setPage] = useState(1)

const fetchImages = async () => {
	setLoading(true)
	let url; 
	const urlPage = `&page=${page}`
	const urlQuery = `&query=${query}`

	if(query) {
		url = `${searchURL}${cliendID}${urlPage}${urlQuery}`
	}else{
		url=`${mainURL}${cliendID}${urlPage}`
	}

	try {
		const response = await fetch(url)
		const data = await response.json()
		console.log(data.results)
		setPhotos((oldPhoto) => {
			if(query && page===1){
				return data.results
			}
			else if(query){
				return [...oldPhoto, ...data.results]
			}
			else{
				return [...oldPhoto, ...data]
			}
		})
	} catch (error) {
		setLoading(false)
		console.log(error)
	}
}

useEffect(()=> {
	fetchImages()
}, [page])

useEffect(()=>{
	const event = window.addEventListener('scroll',() =>{
		if(
			(!loading && window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2
		){
			setPage((oldPage)=>{
				return oldPage + 1
			})
		}
	})
	return ()=> window.removeEventListener('scroll', event)
}, [])

const handleSubmit = (event) =>{
	event.preventDefault()
	setPage(1)
	fetchImages()
}


	return (
	<div className='mt-4'>
        <div className='search'>
            <form className='search-form'>
                <input type='search' placeholder='Search photos...' className="form-input" value={query} onChange={(event)=> setQuery(event.target.value)}/>
				<button type="submit" className="submit-btn" onClick={handleSubmit}>Search</button>
            </form>
        </div>

		<div className="photos">
			<div className="photo-center">
				{
				photos.map((photo, index) => {
					return  <Photo key={index} {...photo} />
				})
				}

			</div>

		</div>





    </div>

	
	);
};

export default Home;
