import { useState, useEffect } from 'react';
import { useSelector } from "../../store/store";
import './PharmacySelectionCard.scss';
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function PharamcySelectionCard() {
    const selectedPharmacy = useSelector(state => state.pharmacy.selectedPharmacy);

    const [isOutgoing, setIsOutgoing] = useState(false);
    const [currentPharmacy, setCurrentPharmacy] = useState(selectedPharmacy);

    useEffect(() => {
        setIsOutgoing(true);
        
        setTimeout(() => {
            setCurrentPharmacy(selectedPharmacy);
            setIsOutgoing(false);
        }, 200);
        
    }, [selectedPharmacy]);
    

    return (
        <div className="pharmacy-selection">
            {!currentPharmacy?.name 
                ? null 
                : <Card className={isOutgoing ? 'pharmacy-card outgoing' : 'pharmacy-card incoming'}>
                    <CardHeader title={currentPharmacy.name} />
                    <CardContent>                
                        <Typography> {currentPharmacy.address} </Typography>
                        <Typography gutterBottom> 
                            {`${currentPharmacy.city}, ${currentPharmacy.state} ${currentPharmacy.zip}`} 
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary"> RX Filled </Typography> 
                        {currentPharmacy.prescriptionsFilled} 
                    </CardContent>
                  </Card>}
        </div>
    );
}