import React, { useRef, useState } from 'react';
import Header from './Header';
import './App.css';
import axios from 'axios';
import Loading from './Loading';
import Contact from './Contact';

export default function App() {
  const [sortData, setSortData] = useState('');
  const [urlData, setUrlData] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);  
  const contactRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const copyToClipboard = async () => {
    try {
      const copyText = `https://usort.netlify.app/link/${sortData}`;

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(copyText);
        alert('Copied the text: ' + copyText);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = copyText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Copied the text: ' + copyText);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy text. Please copy manually.');
    }
  };

  const generate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://usort.netlify.app/api/data',
        { real_url1: url },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setSortData(response.data);
      setUrlData(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    loading ? <Loading /> : (
      <div className='screen'>
        <Header scrollToContact={scrollToContact} />
        <div
          className='homeimg'
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
        >
          <div className='come'>
            <form onSubmit={generate}>
              <input
                type='text'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder='ENTER YOUR URL DONT ADD HTTP:// OR HTTPS://'
                name='real_url'
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Generating...' : 'GENERATE'}
              </button>

              
            </form>
            {urlData && (
              <>
              <div className='copy'> 
                <input
                  type='text'
                  id='myInput'
                  value={`${sortData}`}
                  readOnly
                />
                <button onClick={copyToClipboard}>Click To Copy</button>
              
              </div>
              </>
            )}
          </div>
        </div>
        <Contact ref={contactRef} />
      </div>
    )
  );
}
