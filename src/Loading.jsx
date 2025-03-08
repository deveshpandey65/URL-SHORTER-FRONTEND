import React from 'react'
<link rel="stylesheet" type="text/css" href="path/to/react-spinner.css"></link>
export default function Loading() {
  return (
    <div className="loading">
        <div className="loading-screen">
            <h1>Loading...</h1>
            <script src="path/to/react-spinner/build/index.js"></script>
        </div>
    </div>
  )
}
