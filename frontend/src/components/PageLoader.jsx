import { Loader2Icon } from 'lucide-react';
import React from 'react'

const PageLoader = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
       <Loader2Icon className='animate-spin size-10'/>
    </div>
  )
}

export default PageLoader;