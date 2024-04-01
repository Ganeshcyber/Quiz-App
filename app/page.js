'use client'


import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [name, setName] = useState('');


  const handleInputChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    localStorage.setItem('userName', newName);
  };
  
  return (
    <main>
      <div className='container'>
        <h1>Quiz App</h1>
        <input
          type='text'
          placeholder='Enter your name'
          value={name}
          onChange={handleInputChange}
        />

        <Link href={name ? '/quiz' : '#'}>
          <button disabled={!name}>Start Quiz</button>
        </Link>
      </div>
      
    </main>
  );
}