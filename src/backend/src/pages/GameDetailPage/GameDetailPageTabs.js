import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import GameDetails from '../../components/GameDetails';
import DLCTable from '../../components/DLCTable';
import PlatformRequirements from '../../components/PlatformRequirements';
import RelatedGames from '../../components/RelatedGames';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const GameDetailPageTabs = ({ detail, DLCs, gamePlatform, relatedGame }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // check if the data is empty
    const tabs = [
        { label: 'Details', content: <GameDetails detail={detail} /> },
        ...(DLCs && DLCs.length > 0 ? [{ label: 'DLCs', content: <DLCTable DLCs={DLCs} /> }] : []),
        ...(gamePlatform && gamePlatform.length > 0 ? [{ label: 'Platform Requirements', content: <PlatformRequirements gamePlatform={gamePlatform} /> }] : []),
        ...(relatedGame && relatedGame.length > 0 ? [{ label: 'Related Games', content: <RelatedGames relatedGames={relatedGame} /> }] : [])
    ];

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="game tabs">
                    {tabs.map((tab, index) => (
                        <Tab label={tab.label} {...a11yProps(index)} key={index} />
                    ))}
                </Tabs>
            </Box>
            {tabs.map((tab, index) => (
                <TabPanel value={value} index={index} key={index}>
                    {tab.content}
                </TabPanel>
            ))}
        </Box>
    );
};

export default GameDetailPageTabs;
