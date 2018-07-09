import Header from '../../containers/header'
import Footer from '../../components/Footer/Footer'

export default ({ children }) => (
  <div>
    <Header />
    { children }
    <Footer />
  </div>
)