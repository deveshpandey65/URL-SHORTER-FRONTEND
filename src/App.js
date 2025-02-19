import React, { useState } from 'react';
import Header from './Header';
import './App.css';
import axios from 'axios';

export default function App() {
  const [isActive, setIsActive] = useState(false);
  const [sortData, setSortData] = useState('');
  const [urlData, setUrlData] = useState(false);
  const [url, setUrl] = useState('');

  const copyToClipboard = () => {
    const copyText = document.getElementById('myInput');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert('Copied the text: ' + copyText.value);
  };

  const generate = (e) => {
    e.preventDefault();

    axios
      .post(
        'https://usort.netlify.app/api/data',
        { real_url1: url },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(response => {
        setSortData(response.data);
        setUrlData(true);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='screen'>
      <Header />
      <div
        className='homeimg'
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        <div className='come'>
          <div className={isActive ? 'name-come active' : 'name-come'}>
            <h1>Sort Your URL</h1>
          </div>
          <form onSubmit={generate}>
            <input
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='ENTER YOUR URL'
              name='real_url'
              required
            />
            <button type="submit">GENERATE</button>
          </form>
          <div>
            {urlData && (
              <>
                <input
                  type='text'
                  id='myInput'
                  value={`https://usort.netlify.app/link/${sortData}`}
                  readOnly
                />
                <button onClick={copyToClipboard}>Click To Copy</button>
              </>
            )}
          </div>
        </div>
        {console.log(sortData)}
      </div>
    </div>
  );
}
