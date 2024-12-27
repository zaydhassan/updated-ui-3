import React, { useState, useEffect } from 'react';
import './App.css';
import StatsPanel from './components/StatsPanel';
import Header from './components/Header';
import MapComponent from './components/MapComponent';
import ThreatPanel from './components/Threatpanel';
import { ThemeProvider } from './components/ThemeContext';
import Loader from './components/Loader';
import IncidentModal from './components/IncidentModal';
import ThreatModal from './components/ThreatModal';

// dummy
const threatDataArray = [
    {
        "threat_name": "Other",
        "count": 544,
        "percentage": 57.263157894736835
    },
    {
        "threat_name": "SSH Bruteforce",
        "count": 228,
        "percentage": 24
    },
    {
        "threat_name": "HTTP Scan",
        "count": 110,
        "percentage": 11.578947368421053
    },
    {
        "threat_name": "Telnet Bruteforce",
        "count": 42,
        "percentage": 4.421052631578947
    },
    {
        "threat_name": "SMB/RDP bruteforce",
        "count": 16,
        "percentage": 1.6842105263157894
    },
    {
        "threat_name": "HTTP Exploit",
        "count": 10,
        "percentage": 1.0526315789473684
    }
];

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
    const [attackSpeed, setAttackSpeed] = useState(1500);
    const [showIncidentModal, setShowIncidentModal] = useState(false);
    const [incidentData, setIncidentData] = useState(null);
    const [showThreatModal, setShowThreatModal] = useState(false);
    const [selectedThreatData, setSelectedThreatData] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleShowIncident = () => {
        const data = {
            incident_name: "Simulated Incident",
            date: "2024-11-20T12:00:00Z",
            description: "Description of a simulated incident.",
            affected_zones: ["Zone 1", "Zone 2"],
            status: "Active"
        };
        setIncidentData(data);
        setShowIncidentModal(true);
    };

    const handleShowThreat = (index) => {
        setSelectedThreatData(threatDataArray[index]);
        setShowThreatModal(true);
    };

    return (
        <ThemeProvider>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="App">
                    <Header onToggleIncidents={handleShowIncident} onToggleThreats={() => handleShowThreat(0)} />
                    <div className="top-border"></div>
                    <div className="content">
                        <MapComponent isSidebarOpen={isRightSidebarOpen} attackSpeed={attackSpeed} />
                        <StatsPanel
                            toggleSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                            isSidebarOpen={isRightSidebarOpen}
                        />
                        <ThreatPanel
                            isSidebarOpen={isLeftSidebarOpen}
                            toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                            handleSpeedChange={setAttackSpeed}
                            handleUpdateAttacks={(newCount) => console.log('Updated attack count to:', newCount)}
                        />
                        {showIncidentModal && (
                            <IncidentModal
                                isOpen={showIncidentModal}
                                onClose={() => setShowIncidentModal(false)}
                                theme='dark' 
                                data={incidentData}
                            />
                        )}
                        {showThreatModal && (
                            <ThreatModal
                                isOpen={showThreatModal}
                                onClose={() => setShowThreatModal(false)}
                                data={selectedThreatData}
                            />
                        )}
                    </div>
                </div>
            )}
        </ThemeProvider>
    );
}

export default App;
