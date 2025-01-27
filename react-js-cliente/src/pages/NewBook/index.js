import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImage from '../../assets/logo.svg'; 
import api from '../../services/api';


export default function NewBook() {
    const [idBook, setIdBook] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const [price, setPrice] = useState('');

    const { bookId } = useParams();

    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    const autorization = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }

    useEffect(() => {
        if (bookId === '0') return;
        loadBook();
    }, [bookId]);


    async function loadBook() {
      try {
        const response = await api.get(`api/book/v1/${bookId}`, autorization);

        const dateFormatad =  response.data.launchDate.split("T", 10)[0];

        setIdBook(response.data.id);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPrice(response.data.price);
        setLaunchDate(dateFormatad);
      } catch (err) {
        alert('error recovering book!');
        navigate('/book');
      }
    }

    async function SaveOrUpdate(e) {
      e.preventDefault();
  
      const data = {     
        title,
        author,
        launchDate,
        price, 
      };
      
      try {

        if (bookId === '0') {
             await api.post('api/book/v1', data, autorization);            
        } else {
          data.id = idBook;
          await api.put('api/book/v1', data, autorization);   

        }

       } catch (err) {
            alert('Error while recording Book! Try again!');
          }
          navigate('/book');
    }
  async function CreateNewBook(e) {
    SaveOrUpdate(e);
  }

    return (
      <div className="new-book-container">
        <div className="content">
            <section className='form'>
              <img src={logoImage} alt="Erudito" />
              <h1>Add New Book</h1>
              <Link className="black-link" to="/book">
                 <FiArrowLeft size={16} color='#251fc5' />
                 Home
              </Link>
            </section>
            <form onSubmit={CreateNewBook}>
                <input 
                    placeholder='Title' 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                 />
                <input 
                   placeholder='Author' 
                   value={author}
                   onChange={e => setAuthor(e.target.value)}
                />
                <input 
                   type='date' 
                   value={launchDate}
                   onChange={e => setLaunchDate(e.target.value)} 
                />
                <input 
                   placeholder='Price' 
                   value={price}
                   onChange={e => setPrice(e.target.value)} 
                 />

                <button className='button' type='submit'>add</button>
            </form>
        </div>
      </div>    
    );
}