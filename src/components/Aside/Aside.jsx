import './Aside.scss';
import logo from '../../assets/images/logo.svg';
import Card from '../Card/Card';

function Aside({ selectedBusiness }) {
   return (
      <div className='aside'>
         {selectedBusiness && <Card title={selectedBusiness.name} imageSrc={logo} caption={selectedBusiness.location.display_address} />}
         {selectedBusiness && <Card title={selectedBusiness.name} imageSrc={logo} caption={selectedBusiness.location.display_address} />}
         {selectedBusiness && <Card title={selectedBusiness.name} imageSrc={logo} caption={selectedBusiness.location.display_address} />}

         {selectedBusiness && <Card title={selectedBusiness.name} imageSrc={logo} caption={selectedBusiness.location.display_address} />}

         {selectedBusiness && <Card title={selectedBusiness.name} imageSrc={logo} caption={selectedBusiness.location.display_address} />}

         {selectedBusiness && <Card title={selectedBusiness.name} imageSrc={logo} caption={selectedBusiness.location.display_address} />}

         {selectedBusiness && <Card title={selectedBusiness.name} imageSrc={logo} caption={selectedBusiness.location.display_address} />}
      </div>
   );
}

export default Aside;
