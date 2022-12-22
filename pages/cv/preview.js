import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Previewstyle from '../../styles/Preview.module.css'

import Downloadandpreview from '../../components/Downloadandpreview'
import { useRef } from 'react'
import Download from '../../components/Download'
import { useReactToPrint } from 'react-to-print'
import Nav from '../../components/Nav'
import Layout from '../../components/Layout'
function Preview() {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: ' size: 2.5in 4in ',
  })

  const [signnedin, setSigneedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    JSON.parse(localStorage?.getItem('user_id')) === '' ||
      JSON.parse(localStorage?.getItem('user_id')) === undefined ||
      JSON.parse(localStorage?.getItem('user_id')) === null ||
      JSON.parse(localStorage?.getItem('user_id')) === '{}'
      ? setSigneedIn(false)
      : setSigneedIn(true)

    if (
      JSON.parse(localStorage?.getItem('user_id')) === '' ||
      JSON.parse(localStorage?.getItem('user_id')) === undefined ||
      JSON.parse(localStorage?.getItem('user_id')) === null
    ) {
      router.push('/')
    } else {
      router.push('/cv/preview')
    }
  }, [])

  return (
          <Layout>
    <>
      <section>
        {
          <>


            <div className={Previewstyle.previewcontainer}>
              <Downloadandpreview onClick={handlePrint} />

              <Download ref={componentRef} />
            </div>
          </>


        }
      </section>
    </>
    </Layout>
  )
}

export default React.forwardRef(Preview)
