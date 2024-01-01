import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';

export default function Index(){

    return (
        <HomeWrapper>

        <CardsWrapper>
            <Card>
                <Tilte>
                    Patient Record
                </Tilte>
                <CardData>
                    <Text>Owner<AccountBoxIcon/></Text>
                    <Text> 123</Text>
                </CardData>
            </Card>

        </CardsWrapper>

        </HomeWrapper>
    )

}

const HomeWrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;

`

const FilterWrapper = styled.div`
    display:flex;
    align-itms

`

