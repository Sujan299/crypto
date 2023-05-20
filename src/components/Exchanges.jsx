import { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, Image, VStack, Heading, Text } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'

function Exchanges() {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(function () {
        const fetchExchanges = async function () {
            try {
                const { data } = await axios.get(`${server}/exchanges`);
                setExchanges(data);
                setLoading(false);

            } catch (error) {
                setLoading(false)
                setError(true);

            }
        }
        fetchExchanges();
    }, []);

    if (error) return <ErrorComponent />;

    return <Container class={'container.xl'}>
        {
            loading ? <Loader /> : <>
                <HStack wrap={'wrap'}
                    justifyContent={'center'}
                >
                    {
                        exchanges.map(
                            function (i) {
                                return <MyExchanges
                                    name={i.name}
                                    url={i.url}
                                    rank={i.trust_score_rank}
                                    image={i.image}

                                />
                            }
                        )
                    }
                </HStack>

            </>
        }
    </Container>

}
function MyExchanges({name, url, image, rank}) {
    return <a href={url} target="blank">
        <VStack
            w={'52'}
            shadow={'lg'}
            p={'8'}
            borderRadius={'lg'}
            transition={'all 0.3s'}
            m={'4'}
            css={{
                "&:hover": {
                    transform: "scale(1.1)",
                }
            }}
        >
            <Image src={image}
                w={'10'}
                h={'10'}
                objectFit={'contain'}
                alt={'Exchange'}
            />
            <Heading size={'md'} noOfLines={1}>{rank}</Heading>
            <Text noOfLines={1}>{name}</Text>
        </VStack>

    </a>
}







export default Exchanges;