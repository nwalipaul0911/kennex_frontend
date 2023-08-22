import React, { Component } from 'react';
import { useLoaderData } from 'react-router-dom';
const Terms = () => {
  const terms = useLoaderData()
  return ( 
    <>
    <div className="container my-5 bg-light shadow py-5 px-4">
      <h1 className='text-center'>Terms and Conditions</h1>
      {terms.map((term, index)=>(<div key={index} className='my-4 py-3'>
        <h4>{term.title}</h4>
        <p>{term.description}</p>
      </div>))}

    </div>
    </>
   );
}
 
export default Terms;