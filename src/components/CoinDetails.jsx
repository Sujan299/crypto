import Loader from './Loader'
import { Container, Image, Text, VStack, Box, Radio,Stat,StatLabel,StatNumber, RadioGroup, HStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { server } from '../index'
import axios from 'axios'
import { useParams } from 'react-router-dom'



function CoinDetails() {
    const [coin, setCoin] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState("inr");
    const currencySymbol =
        currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const params = useParams();

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const { data } = await axios.get(
                    `${server}/coins/${params.id}`
                );

                console.log(data);
                setCoin(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchCoin();
    }, [params.id]);
    return (<>
        <Container maxW={'container.xl'}>
            {
                loading ? <Loader /> : (
                    <>
                        <Box borderWidth={1} width={'full'}>
                            asd
                        </Box>
                    </>
                )
            }
        </Container>
        <RadioGroup value={currency}
            onChange={setCurrency}
            p={'8'}

        >
            <HStack spacing={'4'}>
                <Radio value={'inr'}>INR</Radio>
                <Radio value={'eur'}>EUR</Radio>
                <Radio value={'usd'}>USD</Radio>
            </HStack>
        </RadioGroup>
        <VStack spacing={'4'}
            p={'16'}
            alignItems={'flex-start'}

        >
            <Text fontSize={'small'}
                alignSelf={'center'}
            >
                Last Updated On {"   "}

                {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image src={coin.image.large}
                w={'16'}
                h={'16'}
                objectFit={'contain'}
            />
            <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>{currencySymbol}{coin.market_data.current_price(currency)}</StatNumber>
            </Stat>
        </VStack>
    </>
    )

}
export default CoinDetails;