import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import StatBox from './StatBox';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'; 
import { ThemeContext } from './ThemeContext'; 
import ColorIndication from './ColorIndication';

const PanelContainer = styled.div`
  padding: 14px;
  height: 100vh;
  width: 247px;
  overflow-y: auto;
  background: ${({ theme }) => theme === 'dark' ? '#000' : '#fff'};
  position: fixed;
  right: ${props => (props.isOpen ? '0' : '-300px')}; 
  top: 0;
  transition: right 0.4s ease-in-out;
  z-index: 10;
`;

const ToggleIcon = styled.div`
  position: fixed;
  right: 35px;
  bottom: 13px;
  cursor: pointer;
  color: white;
  background-color: #2c3e50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37px;
  height: 35px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;
 
const QuoteBox = styled.div`
  color: ${({ theme }) => theme === 'dark' ? 'white' : 'black'};
  background-color: ${({ theme }) => theme === 'dark' ? '#000' : '#fff'};
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
  border: 1.9px solid #3478f6;
  font-size: 0.92em;
  font-weight: bold;
  margin-top: 62px;
  z-index: 999;

&:hover {
  background-color: ${({ theme }) => theme === 'dark' ? '#1a2f40' : '#e3f2fd'};  
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
}
`;



const industryIcons = {
  "Adult Entertainment": "/adult_entertainment.png",
  "Computer Software": "/computer_software.png",
  "Cryptocurrency": "/cryptocurrency.png",
  "Gambling & Casinos": "/gambling_and_casinos.png",
  "Information Technology and Services": "/info_tech_and_services_1.png",
  "Internet": "/internet.png",
  "Retail": "/retail.png",
  "Telecommunication": "/telecommunication.png",
  "Media": "/social-media.png"
};

const StatsPanel = ({ isSidebarOpen, toggleSidebar }) => {
  const { theme } = useContext(ThemeContext);
  const [targetedNations, setTargetedNations] = useState([]);
  const [targetedIndustries, setTargetedIndustries] = useState([]);
 
  useEffect(() => {
    const nationSocket = new WebSocket('ws://localhost:8000/ws/top5_country/');
    nationSocket.onmessage = (event) => {
      const nationMessage = JSON.parse(event.data);
      const nationData = nationMessage.data;  
      console.log('Nation data received:', nationData);  
      setTargetedNations(prevNations => {
        const updatedNations = [
          ...prevNations,
          {
            name: nationData.target_country_name || 'No Name Provided', 
            value: nationData.value,
            color: '#FF6347',
            flag: nationData.target_country_alpha2
        ? `https://flagcdn.com/w40/${nationData.target_country_alpha2.toLowerCase()}.png`
        : '/default_flag.png',
          }
        ];
        return updatedNations.slice(-5);  
      });
    };
    nationSocket.onclose = () => console.log('Nations WebSocket closed');

    const industrySocket = new WebSocket('ws://localhost:8000/ws/top5_industry/');
    industrySocket.onmessage = (event) => {
      const industryMessage = JSON.parse(event.data);
      const industryData = industryMessage.data;  
      console.log('Industry data received:', industryData);  
      setTargetedIndustries(prevIndustries => {
        const updatedIndustries = [
          ...prevIndustries,
          {
            name: industryData.industry_name || 'No Industry Name', 
            value: industryData.value,
            color: '#87CEEB',
            icon: industryIcons[industryData.industry_name] || '/default.jpg'
          }
        ];
        return updatedIndustries.slice(-5);  
      });
    };
    industrySocket.onclose = () => console.log('Industries WebSocket closed');
    return () => {
      nationSocket.close();
      industrySocket.close();
    };
  }, []);
 
  return (
<>
<PanelContainer isOpen={isSidebarOpen} theme={theme}>
<QuoteBox theme={theme}>SAVE YOURSELF FROM CYBER ATTACK</QuoteBox>
<StatBox
          title="TYPES OF CYBER ATTACKS"
          items={[
            { name: 'HTTP_Exploit', color: 'red' },
            { name: 'HTTP_Scan', color: 'orange' },
            { name: 'SSH_Bruteforce', color: 'yellow' },
            { name: 'SMB_RDP_bruteforce', color: 'green' },
            { name: 'Telnet_Bruteforce', color: 'blue' },
          ]}
        />
<StatBox title="TARGETED NATIONS" items={targetedNations} />
{/* <StatBox title="TARGETED INDUSTRIES" items={targetedIndustries} /> */}


<StatBox 
          title="TARGETED INDUSTRIES" 
          items={targetedIndustries.map(ind => ({
            ...ind,
            label: (
              <>
                <img 
                  src={ind.icon} 
                  alt={`${ind.name} icon`} 
                  style={{ width: '20px', height: '20px', marginRight: '8px' }} 
                />
                {ind.name}
              </>
            )
          }))}
        />
 <ColorIndication theme={theme} />
</PanelContainer>
<ToggleIcon onClick={toggleSidebar}>
        {isSidebarOpen ? <FaArrowAltCircleLeft size="20" /> : <FaArrowAltCircleRight size="20" />}
</ToggleIcon>
</>
  );
};
 
export default StatsPanel;
