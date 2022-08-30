import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { config } from '../constants/config'

const usePageTracking = () => {
  useEffect(() => {
    if (!config.GA_ID) return
    ReactGA.initialize(config.GA_ID)
    ReactGA.send({
      hitType: 'pageview',
      page: '/',
    })
  }, [])
}

export default usePageTracking