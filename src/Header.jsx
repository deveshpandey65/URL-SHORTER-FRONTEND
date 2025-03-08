import React from 'react'

export default function Header({ scrollToContact } ) {
  return (
    <>
        <div className='scr'>
            <div className='header'>
                 <a><h2>URL SHORTER</h2></a>
                 <div className='sub-header'> 
                    <a><p>Home</p></a>
            <a onClick={scrollToContact} ><p>Contact</p></a>
                 </div>
            </div>

        </div>
    </>
  )
}
