import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'

export default ({ children }) => (
  <div>
    <Header />
    { children }
    <Footer />
  </div>
)