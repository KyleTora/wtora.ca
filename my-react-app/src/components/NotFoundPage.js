import React, { useEffect } from 'react';

function NotFoundPage() {
    useEffect(() => {
        document.title = "404 Page";

    }, []);
    
    return (
    <div className='container'>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFoundPage;
